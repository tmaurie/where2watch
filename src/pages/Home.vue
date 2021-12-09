<template>

  <div>
    <v-carousel
        height="auto"
        width="auto"
        cycle
        vertical
        hide-delimiter-background
        :show-arrows="false"
        delimiter-icon="mdi-minus"
        vertical-delimiters=""
    >
      <v-carousel-item
          v-for="(item, i) in popular.slice(0, 5)"
          :key="i"
          :to="`/${item.media_type === 'movie' ? 'm' : 's'}/${item.id}`"
      >

        <v-img
            class="align-center"
            min-height="auto"
            gradient="to top, rgba(var(--bg-color),1) 15%, rgba(var(--bg-color),.7) 100%"
            :src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
        >
          <h3 class="overview_title text-center" >
            {{ item.title ? item.title : item.name }}
          </h3>
          <v-row justify="center" class="pt-8">
            <v-btn > View Details </v-btn>
          </v-row>

        </v-img>
      </v-carousel-item>
    </v-carousel>
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

  </div>
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
      path: '',
      logo: null
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
        // this.logo = response.data.results[0].
      }).finally(() => (this.loaded = true))
    },
    fetchLogo(itemId, itemType) {

      axios.get(`https://api.themoviedb.org/3/${itemType}/${itemId}/images`, {
        params: {
          api_key: API_KEY,
          include_image_language: 'en'
        }
      }).then((response) => {
        let logoFp = response.data.logos[0].file_path
        return `https://image.tmdb.org/t/p/original/${logoFp}`
      })
    },
    getLogo(itemId, itemType) {
      return this.fetchLogo(itemId, itemType)
    }
  }
}

// .then((response) => {
//   // let logoFp = response.data.logos[0].file_path
//   // return `https://image.tmdb.org/t/p/original/${logoFp}`
// })
</script>

<style>
#container {
  width: 1500px;
}
.overview_title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 10px;
  text-transform: uppercase;
  /*text-align: center;*/
}
</style>
