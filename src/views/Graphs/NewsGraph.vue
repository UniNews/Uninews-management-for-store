<template>
  <div>
    <b-loading v-if="isLoading" :is-full-page="true" :active.sync="isLoading" />
    <div v-else class="container pb-20 pt-20">
      <div class="card shadow ml-20 column">
        <header class="card-header">
          <p class="card-header-title">Post views and likes</p>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import userservice from "@/services/userservice";

export default {
  name: "Dashboard",
  components: {
    BarChart
  },
  computed: {
    widthGraph() {
      return this.articles.length * 280;
    }
  },
  data() {
    return {
      articles: [],
      isLoading: false,
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
    async fetchUsers() {
      this.isLoading = true;
      const data = await userservice.getMyArticle(this.getUser()._id);
      this.articles = data.data.articles;
      let lableData = [];
      let viewsData = [];
      let likesData = [];

      this.articles.forEach(e => {
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
    ...mapGetters({
      getUser: "Auth/getUser"
    })
  },
  mounted() {
    this.fetchUsers();
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