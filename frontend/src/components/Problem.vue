<template>
  <div class="problem-view">
    <h3 class="title">{{ title }}</h3>
    <p>{{ problem.description }}</p>
    <pre>
      <code>
        {{ problem.code }}
      </code>
    </pre>
    <form @submit.prevent>
      <textarea class="u-full-width answer" v-model="answer"></textarea>
      <div>
        <button class="button-primary check-btn" @click="checkAnswer()">
          Check Answer
        </button>
        <p class="result">{{ result }}</p>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Problem',
  props: [
    'number'
  ],
  computed: {
    title () {
      return 'Problem #' + this.number
    },
    problem () {
      return this.$store.getters.findProblemById(this.number)
    }
  },
  methods: {
    checkAnswer () {
      const test = this.problem.code.replace('__', this.answer) + '; problem();'
      this.result = eval(test) ? 'Correct!' : 'Incorrect!'
    }
  },
  data () {
    return {
      answer: '',
      result: ''
    }
  }
}
</script>
