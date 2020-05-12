<template>
  <div>
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <section v-else class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="search-size">
            <b-input rounded v-model="query" placeholder="Search name..." icon="magnify"></b-input>
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

                <b-table-column sortable field="role" label="Role">{{ props.row.role }}</b-table-column>
                <b-table-column
                  sortable
                  field="createdAt"
                  label="Date"
                >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
                <b-table-column sortable field="active" label="Status">
                  <b-tag
                    :class="activeTag(props.row.active)"
                  >{{props.row.active ? 'activated' : 'banned'}}</b-tag>
                </b-table-column>
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
    activeTag(isActive) {
      if (isActive) return "is-success";
      else return "is-danger";
    },
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
          return `${item.displayName.toLowerCase()}`.match(
            this.query.toLowerCase()
          );
        } else return true;
      });
    }
  }
};
</script>