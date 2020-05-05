<template>
  <div>
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else class="container mb-20 mt-20">
      <div class="card">
        <div class="card-image is-centered columns pt-20">
          <img class="avatar shadow" :src="user.avatarURL" />
        </div>
        <div class="card-content">
          <div class="content">
            <section>
              <b-tabs v-model="activeTab">
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="account-key"></b-icon>
                    <span>User</span>
                  </template>
                  <b-field label="ID">
                    <b-input disabled v-model="user._id" placeholder="ID"></b-input>
                  </b-field>
                  <b-field label="Role">
                    <b-input disabled v-model="user.role" placeholder="Role"></b-input>
                  </b-field>
                  <b-field label="Active">
                    <b-switch disabled :value="user.active" type="is-success"></b-switch>
                  </b-field>
                  <b-field label="Created date">
                    <b-input disabled v-model="createdAt" placeholder="Created at"></b-input>
                  </b-field>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="information-outline"></b-icon>
                    <span>Basic information</span>
                  </template>
                  <b-field label="Display name">
                    <b-input v-model="user.displayName"></b-input>
                  </b-field>
                  <b-field label="Bio">
                    <b-input v-model="user.bio"></b-input>
                  </b-field>
                  <div v-if="user.role==='store'">
                    <b-field label="Email">
                      <b-input v-model="user.email"></b-input>
                    </b-field>
                    <b-field label="First name">
                      <b-input v-model="user.firstName"></b-input>
                    </b-field>
                    <b-field label="Last name">
                      <b-input v-model="user.lastName"></b-input>
                    </b-field>
                    <b-field label="Mobile phone">
                      <b-input v-model="user.mobilePhone"></b-input>
                    </b-field>
                    <b-field label="Contacts">
                      <b-input v-model="user.contacts"></b-input>
                    </b-field>
                    <div class="buttons end pt-10">
                      <b-button type="is-success" @click="putUser()" icon-right="account-check">Save</b-button>
                    </div>
                  </div>
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="account-multiple"></b-icon>
                    <span>
                      Followings
                      <b-tag rounded>{{followings.length}}</b-tag>
                    </span>
                  </template>
                  <div class="card mt-20 pl-10 pr-10">
                    <b-table
                      :data="followings"
                      :loading="isLoading"
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
                          width="500"
                          field="displayName"
                          label="Name"
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
                          <b-button @click="detailClicked(props.row._id)">
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
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="account-multiple"></b-icon>
                    <span>
                      Followers
                      <b-tag rounded>{{followers.length}}</b-tag>
                    </span>
                  </template>
                  <div class="card mt-20 pl-10 pr-10">
                    <b-table
                      :data="followers"
                      :loading="isLoading"
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
                          width="500"
                          field="displayName"
                          label="Name"
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
                          <b-button @click="detailClicked(props.row._id)">
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
                </b-tab-item>
              </b-tabs>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "../services/userservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: {},
      followings: [],
      followers: [],
      activeTab: 0,
      isLoading: false
    };
  },
  methods: {
    activeTag(isActive) {
      if (isActive) return "is-success";
      else return "is-danger";
    },
    detailClicked(id) {
      this.$router.push({ name: "User", params: { userId: id } });
    },
    async setFollowings(id) {
      const res = await userService.getFollowings(id);
      this.followings = res.data.followings;
    },
    async setFollowers(id) {
      const res = await userService.getFollowers(id);
      this.followers = res.data.followers;
    },
    async fetchUser(userId) {
      this.isLoading = true;
      this.resetUser();
      const res = await userService.getUserById(userId);
      this.user = res.data;
      await this.setFollowings(this.user._id);
      await this.setFollowers(this.user._id);
      this.isLoading = false;
    },
    async putUser() {
      const { role } = this.user;
      if (role === "user") {
        const { displayName, bio, _id } = this.user;
        this.isLoading = true;
        await userService.putUser(
          {
            displayName: displayName,
            bio: bio
          },
          _id
        );
        this.fetchUser(_id);
      } else if (role === "store") {
        const {
          displayName,
          bio,
          _id,
          email,
          firstName,
          lastName,
          mobilePhone,
          contacts
        } = this.user;
        this.isLoading = true;
        await userService.putUser(
          {
            displayName,
            bio,
            email,
            firstName,
            lastName,
            mobilePhone,
            contacts
          },
          _id
        );
        this.fetchUser(_id);
      }
    },
    resetUser() {
      this.user = {};
      this.followings = [];
      this.followers = [];
    },
    ...mapGetters({
      getUser: "Auth/getUser"
    })
  },
  computed: {
    createdAt: {
      get() {
        return convertTimestamptoDate(this.user.createdAt);
      },
      set(newVal) {}
    }
  },
  mounted() {
    const userId = this.getUser()._id;
    if (userId !== undefined) this.fetchUser(userId);
    else this.$router.back();
  }
};
</script>
