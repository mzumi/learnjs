import Vue from 'vue'
import Vuex from 'vuex'
import problems from './modules/problem'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    problems
  },
  strict: false,
  plugins: []
})
