<template>
  <div class='nav-container no-select fixed-top u-full-width'>
    <ul class='inline-list hover-links nav-list six columns'>
      <li><a class="text-lg" href='#'>LearnJS</a></li>
      <li><a href="/problem/1">Start</a></li>
    </ul>
    <div class='four colums'>
      <span class='navbar-padding u-pull-right'>
        <GoogleSignIn />
      </span>
    </div>
  </div>
</template>

<script>
import GoogleSignIn from './GoogleSignIn'

export default {
  components: {
    GoogleSignIn
  }
}

</script>

<style scoped>
  .inline-list {
    margin-bottom: 0px;
  }
  .inline-list li {
    display: inline;
    margin: 0 20px 0 0;
  }

  .fixed-top {
    position: fixed;
    top: 0px;
    z-index: 1024;
  }

  .no-select {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
  }

  .hover-links a {
    text-decoration: none;
  }

  .hover-links a:hover {
    text-decoration: underline;
  }

  .nav-container {
    padding-left: 40px;
    background: #666;
  }

  .nav-container a {
    color: white;
  }

  .navbar-padding {
    padding-top: 7px;
    display: inline-block;
  }
</style>
