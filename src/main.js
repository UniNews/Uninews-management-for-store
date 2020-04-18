import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  render: h => h(App)
});