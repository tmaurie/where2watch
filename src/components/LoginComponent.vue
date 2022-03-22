<template>
  <div>
    <v-menu
        v-if="authorized"
        v-model="menu"
        offset-y
        rounded="lg"
        nudge-bottom="10"
        transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
            color="primary"
            v-on="on"
            class="rounded-lg"
        >
          {{ userData.username }}
            <v-icon right>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list width="250" rounded>
        <v-list-item :to="`/wl/${userData.id}`">
          <v-icon left>mdi-bookmark</v-icon>
          My watchlist
        </v-list-item>
        <v-list-item @click="logoutSession">
          <v-icon color="red" left>mdi-logout</v-icon>
          Logout
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn @click="createToken" v-if="!authorized" color="primary">Log in with TMDB
      <v-icon right>mdi-login-variant</v-icon>
    </v-btn>
  </div>


</template>
<script>
import axios from "axios";

export default {
  name: 'LoginComponent',
  data() {
    return {
      menu: false,
      requestToken: localStorage.getItem('token'),
      sessionID: localStorage.getItem('session_id'),
      authorized: !!localStorage.getItem('session_id'),
      userData: {}
    }
  },
  created() {
    if (localStorage.getItem('token') && !localStorage.getItem('session_id')) {
      this.authorized = true
      this.createSession()
    }

  },
  mounted() {
    if (this.authorized){
      this.getUserData()
    }
  },
  methods: {
    logoutSession() {
      axios.delete('https://api.themoviedb.org/3/authentication/session', {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          session_id: this.sessionID
        }
      }).then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('session_id')
            window.location.reload()
          }
      ).catch(function (error) {
        console.log(error)
      })
    },
    getUserData() {
      axios.get('https://api.themoviedb.org/3/account', {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          session_id: localStorage.getItem('session_id')
        }
      }).then(response => {
        this.userData = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    createToken() {
      axios
          .get('https://api.themoviedb.org/3/authentication/token/new', {
            params: {
              api_key: process.env.VUE_APP_API_KEY
            }
          })
          .then(response => {
            this.requestToken = response.data.request_token
            localStorage.setItem('token', this.requestToken)
            window.location.href = 'https://www.themoviedb.org/authenticate/' + this.requestToken + '?redirect_to=' + process.env.VUE_APP_REDIRECT_URL
          })
          .catch(function (error) {
            console.log(error)
          })
    },
     createSession() {
       axios
          .post(
              'https://api.themoviedb.org/3/authentication/session/new', {
                request_token: localStorage.getItem('token')
              }, {
                params: {
                  api_key: process.env.VUE_APP_API_KEY
                }
              }
          )
          .then(response => {
            this.sessionID = response.data.session_id
            localStorage.setItem('session_id', this.sessionID)
            this.getUserData()
          })
          .catch(function (error) {
            console.log(error)
          })
    },
  },
}
</script>
