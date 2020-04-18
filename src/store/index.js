import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import authModule from './modules/auth'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const modules = {
  Auth: authModule
}

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
})
