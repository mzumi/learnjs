// initial state
const state = {
  all: [
    {
      id: 1,
      code: 'function problem() { return __; }',
      description: 'What is truth?'
    },
    {
      id: 2,
      code: 'function problem() { return 42 === 6 * __; }',
      description: 'Simple Math'
    }
  ]
}

const getters = {
  findProblemById: (state) => (id) => {
    return state.all.find(problem => problem.id === id)
  }
}

export default {
  state,
  getters
}
