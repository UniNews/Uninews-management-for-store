<template>
  <div>
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else>
      <section class="hero is-small">
        <div class="hero-body">
          <div class="container">
            <div class="search-size">
              <b-input
                rounded
                v-model="query"
                placeholder="Search name, title, description..."
                icon="magnify"
              ></b-input>
            </div>
            <div class="columns end">
              <b-button
                @click="goOverview()"
                class="mt-20 mr-10"
                type="is-info"
                icon-right="chart-bar"
              >Overview</b-button>
              <b-button
                @click="goCreateNews()"
                class="mt-20 mr-10"
                type="is-success"
                icon-right="database-plus"
              >Create news</b-button>
            </div>
            <div class="card mt-20 pl-10 pr-10">
              <b-table
                :data="filterNews"
                ref="table"
                paginated
                per-page="10"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                detailed
                detail-key="_id"
              >
                <template slot-scope="props">
                  <b-table-column field="id" label="ID" numeric width="10" centered>
                    <b-tag>{{ props.row._id }}</b-tag>
                  </b-table-column>
                  <b-table-column
                    field="author.displayName"
                    label="Author"
                    sortable
                  >{{ props.row.author.displayName }}</b-table-column>
                  <b-table-column sortable field="title" label="Title">{{ (props.row.title) }}</b-table-column>
                  <b-table-column
                    sortable
                    field="createdAt"
                    label="Date"
                  >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
                  <b-table-column sortable field="newsType" label="Type">
                    <b-tag :class="newsType(props.row.newsType)">{{props.row.newsType}}</b-tag>
                  </b-table-column>
                  <b-table-column label="Detail">
                    <b-button @click="newsClicked(props.row._id)">
                      <span>
                        <b-icon icon="database-search" size="25"></b-icon>
                      </span>
                    </b-button>
                  </b-table-column>
                </template>

                <template slot="detail" slot-scope="props">
                  <article class="media">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img :src="props.row.imageURL" />
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>{{ props.row.description }}</p>
                      </div>
                      <b-tag
                        type="is-primary"
                        :key="index"
                        v-for="(tag, index) in props.row.tags"
                        rounded
                      >{{tag}}</b-tag>
                    </div>
                  </article>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </section>
      <b-modal :active.sync="isCardModalActive" scroll="keep">
        <div class="card shadow ml-20 column">
          <header class="card-header">
            <p class="card-header-title">Overview</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="chartAreaWrapper news-graph">
                <BarChart
                  :options="this.options"
                  :width="this.widthGraph"
                  height="500"
                  :style="`display: block; height: 250px; width: ${this.widthGraph}px`"
                  class="walking-speed-chart"
                  :chartData="this.chartData"
                />
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import userservice from "@/services/userservice";
export default {
  name: "News",
  components: {
    BarChart
  },
  data() {
    return {
      activeTab: 0,
      news: [],
      query: "",
      isLoading: false,
      isCardModalActive: false,
      chartData: null,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1,
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    async fetchNews() {
      this.isLoading = true;
      const data = await userservice.getMyArticle(this.getUser()._id);
      this.news = data.data.articles;
      let lableData = [];
      let viewsData = [];
      let likesData = [];
      this.news.forEach(e => {
        lableData.push(e.title);
        viewsData.push(e.views.length);
        likesData.push(e.likes.length);
      });
      this.chartData = {
        labels: lableData,
        datasets: [
          {
            label: "Views",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            data: viewsData
          },
          {
            label: "Likes",
            backgroundColor: "rgba(0, 102, 0, 0.5)",
            data: likesData
          }
        ]
      };
      this.isLoading = false;
    },
    newsType(type) {
      if (type === "club") return "is-info";
      else return "is-warning";
    },
    newsClicked(id) {
      this.$router.push({ name: "NewsDetail", params: { newsId: id } });
    },
    goCreateNews() {
      this.$router.push({ name: "PostNews" });
    },
    goOverview() {
      this.isCardModalActive = true;
    },
    ...mapGetters({
      getUser: "Auth/getUser"
    })
  },
  mounted() {
    this.fetchNews();
  },
  computed: {
    filterNews() {
      return this.news.filter(item => {
        if (this.query !== "") {
          return `${item.title.toLowerCase()}${item.author.displayName.toLowerCase()}${item.description.toLowerCase()}`.match(
            this.query.toLowerCase()
          );
        } else return this.news;
      });
    },
    widthGraph() {
      return this.news.length * 250;
    }
  }
};
</script>

<style scoped>
.chartAreaWrapper {
  width: 1000;
  height: 500px;
  overflow-x: scroll;
}
</style>