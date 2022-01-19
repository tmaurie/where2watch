<template>
  <v-main class="pa-0" v-if="loaded">

    <Detail :get-img-url="getImgUrl(movie.poster_path)" :providers="providers" :item-detail="movie"/>
    <v-row no-gutters>
      <ResultList title="You may like" :loaded="loaded" :page="page" :path="path" type="movie" :results="similarMovies.slice(0,5)"/>
    </v-row>

  </v-main>
</template>

<script>
import axios from "axios";
import Detail from "@/components/Detail";
import ResultList from "@/components/ResultList";

const imageapi = 'https://source.unsplash.com/random'
const API_KEY = process.env.VUE_APP_API_KEY

export default {
  name: "ItemDetail",
  components: {ResultList, Detail},
  data() {
    return {
      image: imageapi,
      movie: null,
      loaded: false,
      providers: [],
      similarMovies: [],
      page: '1',
      path: ''
    }
  },
  methods: {
    getImgUrl(image) {
      return 'https://image.tmdb.org/t/p/original' + image
    },
    getItemDetails() {
      // const ITEM_ID = this.$route.params.id
      axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: [
                'credits',
                'videos'
              ].join(','),
            }
          })
          .then((response) => {
            this.movie = response.data
            this.loaded = true
            // console.log(response)
          })
          .finally(() => (this.loaded = true));
      axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/watch/providers`,
          {
            params: {
              api_key: API_KEY
            }
          })
          .then((response) => {
            this.providers = response.data.results.FR ? response.data.results.FR.flatrate : ""
            this.loaded = true
            // console.log(response)
          })
          .finally(() => (this.loaded = true))
    },
    getSimilarMovies() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/recommendations`,
          {
            params: {
              api_key: API_KEY,
              page: this.page
            }
          })
          .then((response) => {
            this.similarMovies = response.data.results
            this.loaded = true
          })
          .finally(() => (this.loaded = true));
    }
  },
  mounted() {
    this.getItemDetails()
    this.getSimilarMovies()
  },
}
</script>

<style scoped>

</style>
