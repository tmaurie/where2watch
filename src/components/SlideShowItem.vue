<template>
  <v-img
      class="align-center"
      min-height="auto"
      gradient="to top, rgba(var(--bg-color),1) 15%, rgba(var(--bg-color),.5) 100%"
      :src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
      :lazy-src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
  >

    <v-row align="center" justify="center" class="py-6">
      <v-col cols="6" sm="2" v-if="loaded">
        <h3 v-if="!logo" class="overview_title text-center">
          {{ item.title ? item.title : item.name }}
        </h3>
        <v-img v-else class="justify-center" contain :src="logo" :lazy-src="logo"></v-img>
      </v-col>
    </v-row>


  </v-img>
</template>
<script>
import axios from "axios";
const API_KEY = process.env.VUE_APP_API_KEY

export default {
  name: 'SlideShowItem',
  data() {
    return {
      loaded : false,
      logo: ''
    }
  },
  props: {
    item: {}
  },
  mounted() {
    this.fetchLogo(this.item.id,this.item.media_type)
  },
  methods: {
    fetchLogo(itemId, itemType) {

      axios.get(`https://api.themoviedb.org/3/${itemType}/${itemId}/images`, {
        params: {
          api_key: API_KEY,
          include_image_language: 'en'
        }
      }).then((response) => {
        let logoFp = response.data.logos[0].file_path
        this.logo =  `https://image.tmdb.org/t/p/original${logoFp}`
      }).finally(() => (this.loaded = true))
    },
  }
}
</script>
<style>
.overview_title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 10px;
  text-transform: uppercase;
}
</style>
