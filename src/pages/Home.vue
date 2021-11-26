<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">

        <SearchBox :input="searchResults"/>
        <ResultList v-if="this.movie.length > 0" class="mt-0" :list="this.movie"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import SearchBox from "@/components/SearchBox";
import ResultList from "@/components/ResultList";
import axios from "axios";

const API_KEY = process.env.VUE_APP_API_KEY

export default {

  name: "Home",
  data: () =>( {
      movie : []
  }),
  components: {ResultList, SearchBox},
  methods: {
    searchResults(typedCharacter) {
      const input = typedCharacter;
      //don't query the first few characters (api limits to 40 characters per 10sec)
      if (input.length > 2) {

        //do our api call for the list of results

        axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}`,
            {
              params: {
                api_key: API_KEY
              }
            })
            .then((response) => {
              this.movie = response.data.results
              this.loaded = true
              console.log(response)
            })
            .finally(() => (this.loaded = true));
      }if (typedCharacter === '') {
        this.movie = []
      }
    }
  },

}
</script>

