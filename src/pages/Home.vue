<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">

        <!--        <SearchBox :input="searchResults"/>-->
        <!--        <ResultList v-if="this.movie.length > 0" class="mt-0" :list="this.movie"/>-->
        <v-autocomplete
            :items="items"
            :loading="isLoading"
            :search-input.sync="searchResults"
            outlined
            rounded
            hide-no-data
            item-text="title"
            item-value="API"
            label="Search"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
        ></v-autocomplete>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";

const API_KEY = process.env.VUE_APP_API_KEY

export default {

  name: "Home",
  data: () => ({
    titleLimit: 60,
    movies: [],
    isLoading: false,
    model: null,
    searchResults: null,
  }),


  watch: {
    searchResults(input) {

      this.isLoading = true

      if (input != null && input.length > 0){
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}`,
            {
              params: {
                api_key: API_KEY
              }
            })
            .then((response) => {
              this.movies = response.data.results
              console.log(response)
            })
            .finally(() => (this.isLoading = false));
      } else {
        this.movies = []
        this.isLoading = false
      }
    },
  },
  computed: {
    items() {
      return this.movies.map(movie => {

        return movie.title.length > this.titleLimit
            ? movie.title.slice(0, this.titleLimit) + '...'
            : movie.title
      })
    },
  },
}
</script>

