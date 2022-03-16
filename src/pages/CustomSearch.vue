<template>
  <div>
    <v-container id="container" fluid>
      <h1>Search with custom criteria</h1>
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
          {{ genre.name }}
        </v-chip>
      </v-chip-group>

      <h3 class="mb-2">
        Choose Platform
      </h3>
      <v-chip-group
          v-model="selectedWatchProviders"
          multiple
          column
          active-class="primary--text">
        <v-chip filter :value="provider.provider_id" v-for="provider in watchProvidersList"
                :key="provider.provider_id">
          <v-avatar left>
            <v-img :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"></v-img>
          </v-avatar>
          {{ provider.provider_name }}
        </v-chip>
      </v-chip-group>


      <h3 class="mb-2">
        Choose keywords
      </h3>
      <v-row no-gutters>
        <v-autocomplete
            filled
            rounded
            v-model='selectedKeywords'
            :search-input.sync='searchKeyword'
            return-object
            :items='keyword'
            item-text='name'
            item-value='id'
            multiple
            chips
            hide-details
            hide-no-data
            no-data-text='Nothing was found!'
            placeholder='Search Keywords'>

        </v-autocomplete>
        <v-list rounded v-if="selectedKeywords.length > 0" dense>
          <v-list-item v-for="(keyword, index) in selectedKeywords" :key="keyword.id">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase">{{ keyword.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="selectedKeywords.splice(index, 1)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-row>

      <v-row class="mb-8 mt-8" justify="center">
        <v-btn rounded color="primary" class="ma-2"
               @click="getResultList(typeWatch,selectedGenres,selectedWatchProviders,selectedKeywords, false)">Search
        </v-btn>
        <v-btn rounded color="primary" outlined class="ma-2"
               @click="getResultList(typeWatch,selectedGenres,selectedWatchProviders,selectedKeywords, true)">Surprise
          me !
          <v-icon>mdi-dice-5</v-icon>
        </v-btn>
      </v-row>

    </v-container>

    <ResultList v-if="results !== null" :loaded="loaded" :path="path" :results="results" :toggle="toggle"
                :type="toggle"/>
<!--    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="info.total_pages <= 500 ? info.total_pages : 500 "
          total-visible="6"
          @input="handlePageChange"
      ></v-pagination>
    </div>-->
  </div>

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
    selectedKeywords: [],
    results: [],
    keyword: [],
    info: [],
    loaded: false,
    path: '',
    toggle: 'movie',
    typeWatch: "movie",
    searchKeyword: null,
    page: 1
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
        this.watchProvidersList = response.data.results.slice(0, 8)
        this.watchProvidersList.splice(2, 1)
      })
    },
    getResultList(type, genres, platform, keywords, random) {
      let randomItem = Math.floor(Math.random() * 19)
      let path = type === 'movie' ? 'm' : 's'
      axios.get(`https://api.themoviedb.org/3/discover/${type}`,
          {
            params: {
              api_key: process.env.VUE_APP_API_KEY,
              with_genres: genres.join(),
              with_watch_providers: platform.join('|'),
              with_keywords: keywords.map((keyword => keyword.id)).join(),
              watch_region: 'FR',
              page: this.page
            }

          }).then(response => {
        if (random) {
          this.randomId = response.data.results[randomItem].id
          this.$router.push({path: `/${path}/${this.randomId}`})
        } else {
          this.results = response.data.results
          this.info = response.data
          this.toggle = this.typeWatch
          this.loaded = true
        }

      })
    }
  },
  watch: {

    searchKeyword(keyword) {
      axios.get(`https://api.themoviedb.org/3/search/keyword`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query: keyword
        }
      }).then(response => {
        this.keyword = response.data.results
      })

    },
  }

}
</script>

<style scoped>

</style>
