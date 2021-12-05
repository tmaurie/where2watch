<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">

        <!--        <v-btn  @click="getRandom"> go to random</v-btn>-->
        <v-carousel hide-delimiters cycle>
          <v-carousel-item
              v-for="(item, i) in popular.slice(0, 5)"
              :key="i"
              :src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
              :to="`/${item.media_type === 'movie' ? 'm' : 's'}/${item.id}`"
          >

            <v-row class="fill-height ma-0" align="end" justify="center">
              <div class="display-1 white--text"> {{ item.title || item.name }}
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>

      </v-col>
    </v-row>
    <v-container class="mb-10" id="container" fluid>
      <v-row no-gutters>
        <ResultList :loaded="loaded" :page="page" :path="path" :results="popular.slice(5)"/>
      </v-row>

    </v-container>
    <v-footer class="" absolute padless >
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-container>

</template>

<script>

import ResultList from "@/components/ResultList";

const API_KEY = process.env.VUE_APP_API_KEY
import axios from "axios";

export default {

  name: "Home",
  components: {ResultList},
  metaInfo: {
    title: 'Home'
  },
  data() {
    return {
      randomId: null,
      popular: [],
      loaded: false,
      info: [],
      region: "FR",
      page: 1,
      toggle: 'movie',
      path: ''
    }
  },
  mounted() {

    this.getPopular()

  },

  methods: {

    getRandom() {
      let randomPage = Math.floor(Math.random() * 30)
      let randomItem = Math.floor(Math.random() * 19);
      axios.get('https://api.themoviedb.org/3/movie/top_rated', {
        params: {
          api_key: API_KEY,
          page: randomPage
        }
      }).then((response) => {
        this.randomId = response.data.results[randomItem].id

        this.$router.push({path: `/m/${this.randomId}`})
      })

    },
    getPopular() {
      axios.get('https://api.themoviedb.org/3/trending/movie,tv/week', {
        params: {
          api_key: API_KEY,
          page: 1

        }
      }).then((response) => {
        this.popular = response.data.results
        this.info = response.data
      }).finally(() => (this.loaded = true))
    }
  }
}
</script>

<style>
#container {
  width: 1500px;
}
</style>
