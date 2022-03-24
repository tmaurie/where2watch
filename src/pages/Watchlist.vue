<template>
  <div>
    <h1 class="text-center">My watchlist</h1>
    <v-row justify="center" class=" mt-4">
      <v-btn-toggle v-model="toggle"
                    @change="getUserWatchlist"
                    group
      >
        <v-btn class="rounded-lg" value="movies">
          <v-icon>mdi-movie-open</v-icon> &nbsp; Movies
        </v-btn>
        <v-btn class="rounded-lg" value="tv">Series &nbsp;
          <v-icon>mdi-television-classic</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <ResultList  :loaded="loaded" :page="page" type="movie" :results="results"/>
  </div>

</template>

<script>
import axios from "axios";
import ResultList from "@/components/ResultList";

export default {
  name: "Watchlist",
  components: {ResultList},
  data() {
    return {
      sessionID: localStorage.getItem('session_id'),
      results: {},
      info: {},
      page: 1,
      path: 'm',
      toggle: 'movies',
      loaded: false
    }
  },
  mounted() {
    this.getUserWatchlist()
  },
  methods: {
    getUserWatchlist() {
      axios.get(`account/${this.$route.params.id}/watchlist/${this.toggle}`, {
        baseURL: process.env.VUE_APP_BASE_URL,
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          session_id: this.sessionID
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
