import Authentication from '../../api/cognito/authentication'

// initial state
const state = {
  userId: '',
  email: ''
}

const getters = {
  email (state) {
    return state.email
  }
}

const actions = {
  async googleSignIn (context, { googleUser }) {
    const identity = await new Authentication().authenticateByGoogle(googleUser)
    context.commit('setEmail', identity.email)
    context.commit('setUserId', identity.id)
  }
}

const mutations = {
  setUserId (state, userId) {
    state.userId = userId
  },
  setEmail (state, email) {
    state.email = email
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
