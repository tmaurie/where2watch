<template>
  <v-autocomplete
      :items="items"
      :loading="isLoading"
      :search-input.sync="searchResults"
      class="mx-4"
      hide-no-data
      hide-details
      cache-items
      clearable
      flat
      solo
      :item-text="getItemText"
      item-value="API"
      label="Search"
      placeholder="Start typing to Search"
      prepend-inner-icon="mdi-magnify"
      return-object
  >
    <template v-slot:item="{ item }">

      <v-list-item :to='`/m/${item.id}`' v-if="item.media_type==='movie'">
        <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
        >
          <v-img v-if="item.poster_path"
                 :src="(`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.original_title"></v-list-item-title>
          <v-list-item-subtitle v-if="item.release_date">
            {{
              new Date(item.release_date).toLocaleDateString("en-US", {
                year: "numeric"
              })
            }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon >mdi-movie-open</v-icon>
        </v-list-item-action>
      </v-list-item>

<!--      tvshow -->
      <v-list-item :to='`/s/${item.id}`' v-if="item.media_type === 'tv'">
        <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
        >
          <v-img v-if="item.poster_path"
                 :src="(`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content >
          <v-list-item-title v-text="item.original_name"></v-list-item-title>
          <v-list-item-subtitle v-if="item.first_air_date">
            {{
              new Date(item.first_air_date).toLocaleDateString("en-US", {
                year: "numeric"
              })
            }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-television-classic</v-icon>
        </v-list-item-action>
      </v-list-item>

    </template>

  </v-autocomplete>
</template>
<script>


import axios from "axios";

const API_KEY = process.env.VUE_APP_API_KEY

export default {

  name: "SearchBox",
  data: () => ({
    titleLimit: 60,
    items: [],
    isLoading: false,
    model: null,
    searchResults: null,
  }),


  watch: {
    searchResults(input) {

      this.isLoading = true

      if (input != null && input.length > 0) {
        axios.get(`https://api.themoviedb.org/3/search/multi?query=${input}`,
            {
              params: {
                api_key: API_KEY
              }
            })
            .then((response) => {
              this.items = response.data.results
            })
            .finally(() => (this.isLoading = false));
      } else {
        this.items = []
        this.isLoading = false
      }
    },
  },
  methods: {
    getItemText(item) {
      return item.original_title || item.original_name
    }
  }

}
</script>
