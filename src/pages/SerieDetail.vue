<template>
  <v-main class="pa-0" v-if="loaded">
    <Detail :get-img-url="getImgUrl(serie.poster_path)" :providers="providers" :item-detail="serie"/>
  </v-main>
</template>

<script>
import axios from "axios";
import Detail from "@/components/Detail";

const imageapi = 'https://source.unsplash.com/random'
const API_KEY = process.env.VUE_APP_API_KEY

export default {
  name: "ItemDetail",
  components: {Detail},
  data() {
    return {
      colors: [],
      image: imageapi,
      serie: null,
      loaded: false,
      providers: []
    }
  },
  methods: {
    getImgUrl(image) {
      return 'https://image.tmdb.org/t/p/original' + image
    },
    getItemDetails() {
      // const ITEM_ID = this.$route.params.id
      axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: [
                'credits'
              ].join(','),
            }
          })
          .then((response) => {
            this.serie = response.data
            this.loaded = true
            // console.log(response)
          })
          .finally(() => (this.loaded = true));
      axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/watch/providers`,
          {
            params: {
              api_key: API_KEY
            }
          })
          .then((response) => {
            this.providers = response.data.results.FR.flatrate
            this.loaded = true
            // console.log(response)
          })
          .finally(() => (this.loaded = true))
    }
  },
  mounted() {
    this.getItemDetails()
  },
}
</script>

