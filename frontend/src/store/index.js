import Vue from 'vue'
import Vuex from 'vuex'
import problems from './modules/problem'
import authentication from './modules/authentication'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    problems
  },
  strict: false,
  plugins: []
})
