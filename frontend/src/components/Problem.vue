<template>
  <div class="problem-view">
    <h3 class="title">{{ title }}</h3>
    <p>{{ problem.description }}</p>
    <pre>
      <code>
        {{ problem.code }}
      </code>
    </pre>
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
  }
}
</script>
