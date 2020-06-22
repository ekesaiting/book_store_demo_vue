import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  mutations: {
    logout(){
      if (localStorage.getItem("JWT_TOKEN")) {
        localStorage.removeItem("JWT_TOKEN")
        localStorage.removeItem("USER_ID")
        localStorage.removeItem("USER_NAME")
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
