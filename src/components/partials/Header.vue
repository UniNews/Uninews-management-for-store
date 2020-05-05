<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/">Home</b-navbar-item>
      <b-navbar-item href="/#/news">News</b-navbar-item>
      <b-navbar-item href="/#/followers">Followers</b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item class="profile" tag="div">
        <div v-if="$route.name !== 'Login'" @click="profileClicked()">
          <img :src="getUser()?getUser().avatarURL:null" class="image-avatar" />
          {{ getUser()?getUser().displayName:null }}
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div v-if="$route.name !== 'Login'" class="buttons">
          <a class="button is-light" @click="logout()">Logout</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  methods: {
    logout() {
      this.$emit("logout", true);
    },
    ...mapGetters({
      getUser: "Auth/getUser"
    }),
    profileClicked() {
      this.$router.push({
        name: "MyUser"
      });
    }
  }
};
</script>
<style scoped>
.image-avatar {
  margin: -6px;
  border-radius: 22px;
}
.profile {
  cursor: pointer;
}
.profile:hover {
  background-color: rgb(250, 250, 250);
}
</style>