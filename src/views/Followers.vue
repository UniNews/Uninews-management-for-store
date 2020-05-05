<template>
  <div>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="search-size">
            <b-input
              rounded
              v-model="query"
              placeholder="Search name, description..."
              icon="magnify"
            ></b-input>
          </div>
          <div class="card mt-20 pl-10 pr-10">
            <b-table
              :data="filterFollowers"
              ref="table"
              paginated
              per-page="10"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column field="id" label="ID" numeric width="10" centered>
                  <b-tag>{{ props.row._id }}</b-tag>
                </b-table-column>
                <b-table-column
                  field="displayName"
                  label="Display Name"
                  sortable
                >{{ props.row.displayName }}</b-table-column>
                <b-table-column sortable field="bio" label="Bio">{{ props.row.bio }}</b-table-column>
                <b-table-column field="tags" label="Tags">
                  <div v-if="props.row.tags && props.row.tags.length > 0">
                    <b-tag
                      type="is-primary"
                      :key="index"
                      v-for="(tag, index) in props.row.tags"
                      rounded
                    >{{tag}}</b-tag>
                  </div>
                </b-table-column>
                <b-table-column
                  sortable
                  field="createdAt"
                  label="Date"
                >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>

                <b-table-column label="Detail">
                  <b-button @click="followerClicked(props.row._id)">
                    <span>
                      <b-icon icon="account-search" size="25"></b-icon>
                    </span>
                  </b-button>
                </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                    </p>
                    <p>Nothing here.</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>
        </div>
      </div>
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import userservice from "@/services/userservice";

export default {
  name: "Followers",
  data() {
    return {
      followers: [],
      query: "",
      isLoading: false
    };
  },
  methods: {
    ...mapGetters({
      getUser: "Auth/getUser"
    }),
    async fetchFollowers() {
      this.isLoading = true;
      this.followers = [];
      const user = await userservice.getFollowers(this.getUser()._id);
      this.followers = user.data.followers;
      this.isLoading = false;
    },
    followerClicked(id) {
      this.$router.push({ name: "User", params: { userId: id } });
    }
  },
  mounted() {
    this.fetchFollowers();
  },
  computed: {
    filterFollowers() {
      return this.followers.filter(item => {
        if (this.query !== "") {
          return `${item.displayName.toLowerCase()}${item.bio.toLowerCase()}`.match(
            this.query.toLowerCase()
          );
        } else return true;
      });
    }
  }
};
</script>