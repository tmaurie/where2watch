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
    <ResultList :path="path" :loaded="loaded" :page="page" :type="toggle" :results="results"/>
    <div class="text-center mb-3">
      <v-pagination
          v-if="info.total_pages > 1"
          v-model="page"
          :length="info.total_pages <= 500 ? info.total_pages : 500 "
          total-visible="6"
          @input="handlePageChange"
      ></v-pagination>
    </div>

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
      path: '',
      toggle: 'movies',
      loaded: false
    }
  },
  mounted() {
    this.getUserWatchlist()
  },
  methods: {
    handlePageChange(value) {
      this.page = value
      this.getUserWatchlist()
    },
    getUserWatchlist() {
      this.path = this.toggle === 'movies' ? 'm' : 's'
      axios.get(`account/${this.$route.params.id}/watchlist/${this.toggle}`, {
        baseURL: process.env.VUE_APP_BASE_URL,
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          session_id: this.sessionID,
          page: this.page
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
