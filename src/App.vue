<template>
  <div>
    <Header v-if="$route.name !== 'Login'" @logout="logout" />
      <router-view></router-view>
    <Footer v-if="$route.name !== 'Login'" @postArticles="postArticles"/>
    <b-loading :is-full-page="true" :active.sync="isLoading"/>
  </div>
</template>

<script>
import Footer from "./components/partials/Foorter";
import Header from "./components/partials/Header";
import { mapGetters,mapActions } from "vuex"
import newsService from './services/newservice'

export default {
  name: "app",
  components: { Footer, Header },
  data() {
    return {
      isLoading:false
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated:'Auth/isAuthenticated'
    })
  },
  methods:{
    ...mapActions({
      autoLogin:'Auth/autoLogin',
      userLogout:'Auth/logout'
    }),
    async logout (event) {
      if (event) {
        const logoutStatus = await this.userLogout()
        this.$router.push('/login')
      }
    },
    async postArticles (event) {
      this.isLoading=true
      await newsService.postNews(event)
      this.isLoading=false
    }
  },
  mounted(){
    if (this.isAuthenticated) {
      this.autoLogin()
    } else {
      this.$router.push('/login')
    }
  }
};
</script>