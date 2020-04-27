<template>
  <div>
    <Header v-if="$route.name !== 'Login'" @logout="logout" />
    <div v-if="isLoading">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
    <Footer v-if="$route.name !== 'Login'" @postArticles="postArticles" />
  </div>
</template>

<script>
import Footer from "./components/partials/Foorter";
import Header from "./components/partials/Header";
import { mapGetters, mapActions } from "vuex";
import newsService from "./services/newservice";

export default {
  name: "app",
  components: { Footer, Header },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapGetters({
      isError: "Auth/isError",
      isAuthenticated: "Auth/isAuthenticated"
    })
  },
  watch: {
    isError: function(value) {
      if (value) this.goLogin();
    }
  },
  methods: {
    ...mapActions({
      autoLogin: "Auth/autoLogin",
      userLogout: "Auth/logout"
    }),
    async logout(event) {
      if (event) {
        const logoutStatus = await this.userLogout();
        this.$router.push("/login");
      }
    },
    async postArticles(event) {
      await newsService.postNews(event);
    },
    goLogin() {
      if (this.$route.name !== "Login") this.$router.push("/login");
    }
  },
  async created() {
    if (this.isAuthenticated) {
      this.isLoading = true;
      await this.autoLogin();
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.goLogin();
    }
  }
};
</script>