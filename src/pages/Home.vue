<template>

  <div>
    <v-carousel
        v-if="loaded"
        height="auto"
        width="auto"

        vertical
        vertical-delimiters=""
        hide-delimiter-background
        :show-arrows="false"
        delimiter-icon="mdi-minus"
    >
      <v-carousel-item
          v-for="(item, i) in popular.slice(0, 5)"
          :key="i"
          :to="`/${item.media_type === 'movie' ? 'm' : 's'}/${item.id}`"
      >

        <SlideShowItem :item="item"/>
      </v-carousel-item>
    </v-carousel>
    <ResultList title="Trending now"  :loaded="loaded" :page="page" :path="path" :results="popular.slice(5)"/>
    <v-footer absolute padless>
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>powered by <a class="text-decoration-none"
                                                               href="https://developers.themoviedb.org/3">TMDB</a></strong>
      </v-col>
    </v-footer>

  </div>
</template>

<script>


import ResultList from "@/components/ResultList";
import axios from "axios";
import SlideShowItem from "@/components/SlideShowItem";

const API_KEY = process.env.VUE_APP_API_KEY

export default {

  name: "Home",
  components: {SlideShowItem, ResultList},
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
  }
}
</script>

<style>
#container {
  width: 1080px;
}
</style>
