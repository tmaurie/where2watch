<template>
  <div>
    <v-row justify="center" class="mb-2 mt-4" no-gutters>
      <v-btn-toggle v-model="toggle" shaped color="primary" @change="getByWatchProvider">
        <v-btn value="movie">
          <v-icon>mdi-movie-open</v-icon> &nbsp; Movies
        </v-btn>
        <v-btn value="tv">Series &nbsp;
          <v-icon>mdi-television-classic</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <ResultList :loaded="loaded" :path="path" :results="results" :toggle="toggle" :type="toggle"/>
    <div class="text-center mb-3">
      <v-pagination
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

const API_KEY = process.env.VUE_APP_API_KEY
export default {


  name: "WatchProvider",
  components: {ResultList},
  data() {
    return {
      loaded: false,
      info: [],
      results: null,
      region: "FR",
      page: 1,
      toggle: 'movie',
      path: ''
    }
  },
  mounted() {

    this.getByWatchProvider()

  },
  beforeMount() {
    this.getRegion()
  },
  methods: {

    handlePageChange(value) {
      this.page = value
      this.getByWatchProvider()
    },
    getRegion() {
      axios.get("http://ip-api.com/json").then(response => (this.region = response.data.countryCode))
    },
    getByWatchProvider() {
      const WATCH_PROVIDER_ID = this.$route.params.id
      this.path = this.toggle === 'movie' ? 'm' : 's'
      axios.get("https://api.themoviedb.org/3/discover/" + this.toggle, {
        params: {
          api_key: API_KEY,
          ...(WATCH_PROVIDER_ID ? {with_watch_providers: WATCH_PROVIDER_ID} : {}),
          watch_region: this.region,
          page: this.page
        },
      })
          .then((response) => {
            this.results = response.data.results
            this.info = response.data
          })
          .finally(() => (this.loaded = true))
    }
  }
}


</script>

<style scoped>

</style>
