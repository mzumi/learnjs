import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/Landing'
import Problem from '@/components/Problem'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(Router)

const parseProblemNumber = (route) => {
  return {
    number: parseInt(route.params.number)
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/problem/:number',
      name: 'Problem',
      props: parseProblemNumber,
      component: Problem
    }
  ]
})
