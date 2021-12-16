<template>
  <v-container id="container" fluid>
    <h2 class="text-h6 mb-2">
      Choose type
    </h2>
    <v-radio-group v-model="typeWatch" row @change="getGenres">
      <v-radio color="primary" label="Movie" value="movie"></v-radio>
      <v-radio color="primary" label="Serie" value="tv"></v-radio>

    </v-radio-group>

    <h2 class="text-h6 mb-2">
      Choose Genres
    </h2>
    <v-chip-group
        v-model="selectedGenres"
        multiple
        column
        active-class="primary--text">
      <v-chip
          filter
          v-for="genre in genresList"
          :key="genre.id"
          :value="genre.id"
      >
        {{genre.name}}
      </v-chip>
    </v-chip-group>

    <h2 class="text-h6 mb-2">
      Choose Platform
    </h2>
    <v-chip-group
        v-model="selectedWatchProviders"
        multiple
        column
        active-class="primary--text">
      <v-chip filter :value="provider.provider_id" v-for="provider in watchProvidersList.slice(0,8)"
              :key="provider.provider_id">
        <v-avatar left>
          <v-img :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"></v-img>
        </v-avatar>
        {{ provider.provider_name }}
      </v-chip>
    </v-chip-group>




    <v-row class="mb-8 mt-8" justify="center">
      <v-btn @click="getResultList(typeWatch,selectedGenres,selectedWatchProviders)">Search</v-btn>
    </v-row>


    <ResultList v-if="results !== null" :loaded="loaded" :path="path" :results="results" :toggle="toggle" :type="toggle"/>

  </v-container>
</template>

<script>
import axios from "axios";
import ResultList from "@/components/ResultList";

export default {
  name: "CustomSearch",
  components: {ResultList},
  data: () => ({
    genresList: [],
    selectedGenres: [],
    watchProvidersList: [],
    selectedWatchProviders: [],
    selectedKeywords : [],
    results : [],
    keywords : [],
    loaded: false,
    path : '',
    toggle: 'movie',
    typeWatch: "movie",
    searchKeyword : null
  }),

  mounted() {
    this.getGenres(this.typeWatch)
    this.getWatchProvider(this.typeWatch)
  },

  methods: {
    getGenres(type) {
      axios.get(`https://api.themoviedb.org/3/genre/${type}/list`,
          {
            params: {
              api_key: process.env.VUE_APP_API_KEY
            }

          }).then(response => {
        this.genresList = response.data.genres
      })
    },
    getWatchProvider(type) {
      axios.get(`https://api.themoviedb.org/3/watch/providers/${type}`,
          {
            params: {
              api_key: process.env.VUE_APP_API_KEY,
              watch_region: 'FR'
            }

          }).then(response => {
        this.watchProvidersList = response.data.results
      })
    },
    getResultList(type,genres,platform){
      axios.get(`https://api.themoviedb.org/3/discover/${type}`,
          {
            params: {
              api_key: process.env.VUE_APP_API_KEY,
              with_genres : genres.join(),
              with_watch_providers : platform.join(),
              watch_region : 'FR'
            }

          }).then(response => {
        this.results = response.data.results
        this.toggle = this.typeWatch
        this.loaded = true
      })
    }
  },
  watch : {

  searchKeyword(keyword){
    axios.get(`https://api.themoviedb.org/3/search/keyword`, {
      params : {
        api_key : process.env.VUE_APP_API_KEY,
        query : keyword
      }
    }).then(response => {
      this.keywords = response.data.results
    })

  },
  }

}
</script>

<style scoped>

</style>
