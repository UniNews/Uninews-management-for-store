<template>
  <section class="hero is-large">
    <div class="hero-body">
      <div class="container">
        <div class="card card-width margin-auto card-padding">
          <b-field label="Username">
            <b-input v-model="username"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password"></b-input>
          </b-field>
          <div class="dp-flex flex-center">
            <button class="button is-success is-outlined" v-on:click="onSubmit(username,password)">Login</button>
          </div>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"/>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      isLoading:false
    };
  },
  methods: {
    ...mapActions({
      login:'Auth/login',
      autoLogin:'Auth/autoLogin'
    }),
    async onSubmit(username, password) {
      this.isLoading=true
      const auth = {
        username: this.username,
        password: this.password
      }
      const result = await this.login(auth)
      this.isLoading=false
      if(this.isAuthenticated) {
        this.$router.push('/')
      }
    }
  },
  mounted(){
    if(this.isAuthenticated){
      this.autoLogin()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated:'Auth/isAuthenticated'
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-width {
  max-width: 33.3%;
}
.margin-auto {
  margin:auto;
}
.card-padding {
  padding: 15px;
}
</style>