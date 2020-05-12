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
      <b-navbar-item href="/#/">News</b-navbar-item>
      <b-navbar-item href="/#/followers">Followers</b-navbar-item>
    </template>
    <template v-if="this.user !== null" slot="end">
      <b-navbar-item class="profile-nav" tag="div">
        <div class="profile" @click="profileClicked()">
          <span>{{ user.displayName }}</span>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" outlined @click="logout()">Logout</a>
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
    profileClicked() {
      this.$router.push({
        name: "MyUser"
      });
    }
  },
  computed: {
    ...mapGetters({
      user: "Auth/getUser"
    })
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