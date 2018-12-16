<template>
  <div id="app" class="markup">
    <Toolbar />
    <router-view/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
  }
}
</script>

<style>
</style>
