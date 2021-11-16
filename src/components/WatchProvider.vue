<template>
  <v-container fluid>
  test {{$route.params.id}}
    {{info}}
  </v-container>
</template>

<script>
import axios from "axios";
const API_KEY = process.env.VUE_APP_API_KEY

export default {

  name: "WatchProvider",

  data() {
    return {
      loaded: false,
      info: null
    }
  },
  mounted() {

    this.getByWatchProvider()

  },
  methods : {

    getByWatchProvider(){
      const WATCH_PROVIDER_ID = this.$route.params.id
      axios.get("https://api.themoviedb.org/3/discover/movie?with_watch_providers="+WATCH_PROVIDER_ID+"&watch_region=FR&api_key="+API_KEY)
          .then(response => (this.info = response.data.results))
          .finally(() => (this.loaded = true))
    }
  }
}


</script>

<style scoped>

</style>
