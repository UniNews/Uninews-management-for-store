import userService from '@/services/userservice'
import axios from 'axios'

const state = {
  user: null,
  error: false,
  loading: false,
  isAuthenticated: false
}

const getters = {
  isAuthenticated(state) {
    return localStorage.getItem('token')
  },
  getUser(state) {
    return state.user
  },
  isError(state) {
    return state.error
  },
  isLoading(state) {
    return state.loading
  }
}

const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', false)
    try {
      const token = await userService.login(credentials.username, credentials.password)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.data.accessToken}`
      const profile = await userService.getProfile()
      if (profile.data.role === 'store') {
        localStorage.setItem('token', token.data.accessToken)
        commit('SET_AUTH', profile.data)
      }
      else {
        console.log("CALL")
        axios.defaults.headers.common["Authorization"] = null
        alert('Email or password is wrong!')
      }
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_ERROR', true)
      commit('SET_LOADING', false)
      alert('Email or password is wrong!')
    }
  },
  async logout({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', false)
    try {
      localStorage.clear()
      commit('PURGE_AUTH')
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_ERROR', true)
      commit('SET_LOADING', false)
    }
  },
  async autoLogin({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', false)
    try {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const result = await userService.getProfile()
      commit('SET_AUTH', result.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_ERROR', true)
      commit('SET_LOADING', false)
      // alert(err)
    }
  }
}

const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_AUTH(state, user) {
    state.user = user
  },
  PURGE_AUTH(state) {
    state.user = null
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}