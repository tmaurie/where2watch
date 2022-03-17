<template>

  <ResultList title="My watchlist"  :loaded="loaded" :page="page" type="movie" :results="results"/>
</template>

<script>
import axios from "axios";
import ResultList from "@/components/ResultList";

export default {
  name: "Watchlist",
  components: {ResultList},
  data() {
    return{
      sessionID : localStorage.getItem('session_id'),
      results : {},
      info : {},
      page: 1,
      path: 'm',
      loaded : false
    }
  },
  mounted() {
    this.getUserWatchlist()
  },
  methods : {
    getUserWatchlist(){
      axios.get(`account/${this.$route.params.id}/watchlist/movies`, {
        baseURL : process.env.VUE_APP_BASE_URL,
        params : {
          api_key : process.env.VUE_APP_API_KEY,
          session_id : this.sessionID
        }
      }).then((response) => {
        this.results = response.data.results
        this.info = response.data
      }).finally(() => (this.loaded = true))
    }

  }
}
</script>

<style scoped>

</style>
