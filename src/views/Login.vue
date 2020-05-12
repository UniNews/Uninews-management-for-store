<template>
  <div class="center">
    <section class="hero is-large">
      <div class="modal-card shadow" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Store login</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Username">
            <b-input v-model="username" placeholder="Your username" required></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button @click="onSubmit()" class="button is-primary">Login</button>
        </footer>
      </div>
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isLoading: false
    };
  },
  watch: {
    user: function(value) {
      if (value) this.$router.push("/");
    }
  },
  methods: {
    ...mapActions({
      login: "Auth/login"
    }),
    async onSubmit() {
      this.isLoading = true;
      const auth = {
        username: this.username,
        password: this.password
      };
      const result = await this.login(auth);
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters({
      user: "Auth/getUser"
    })
  }
};
</script>