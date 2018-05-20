<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    {{ message }}
  </g-signin-button>
</template>

<script>

export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '549510109261-ld5vkbajelvv0dphrkbb7o5b4hmk79h6.apps.googleusercontent.com'
      }
    }
  },
  computed: {
    message () {
      const email = this.$store.getters.email

      if (email !== '') {
        return email
      }
      return 'Signin with Google'
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      this.$store.dispatch('googleSignIn', { googleUser })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
