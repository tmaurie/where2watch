<template>
  <v-main class="pa-0" v-if="loaded">
    <v-img class="v-img--blurred" id="hero" :aspect-ratio="10" :src="getImgUrl(movie.backdrop_path)"
           gradient="to top, rgba(30,30,30,1) 15%, rgba(30,30,30,.7) 100%">
      <template v-slot:placeholder="">
        <v-row class="pa-3 ma-0 fill-height" justify="end" align="start">
          <v-progress-circular indeterminate="indeterminate" style="opacity: .25"></v-progress-circular>
        </v-row>
      </template>
      <v-container class="py-12" :class="$vuetify.breakpoint.xsOnly">
        <v-row class="py-6" align="center" justify="center">
          <v-col cols="12" sm="4" v-if="movie.poster_path">
            <v-card elevation="15" rounded="xl">
              <v-img :src="getImgUrl(movie.poster_path)" :lazy-src="getImgUrl(movie.poster_path)" :aspect-ratio="2/3">
                <template v-slot:placeholder="">
                  <v-row class="pa-3 ma-0 fill-height" justify="center" align="center">
                    <v-progress-circular indeterminate="indeterminate"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
          <v-col align-self="center">
            <h1 class="display-1 font-weight-bold">{{ movie.title || movie.original_title }}</h1>
            <p v-if="movie.overview">{{ movie.overview }}</p>
            <div class="d-block">
              <h2 class="subtitle-1 d-inline" v-if="movie.release_date"><span class="font-weight-bold">{{
                  new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                }}</span><span class="font-weight-light" v-if="movie.status"> ({{ movie.status }})</span></h2>
              <h2 class="subtitle-1 font-weight-light" v-else>(N/A)</h2>
            </div>
            <div class="mx-n1 py-2">
              <v-chip class="ma-1" v-for="genre in movie.genres" :key="genre.id" :small="$vuetify.breakpoint.smAndDown"
                      outlined="outlined" nuxt="nuxt">{{ genre.name }}
              </v-chip>
            </div>
            <v-btn class="mt-6" height="100" text="text" nuxt="nuxt" exact="exact"
                   :block="$vuetify.breakpoint.smAndDown">
              <div class="mx-n2">
                <v-avatar class="elevation-3 mx-2"
                          v-for="person in movie.credits.cast.slice(0, $vuetify.breakpoint.smAndDown ? 3 : 6)"
                          :key="person.credit_id" :size="$vuetify.breakpoint.smAndDown ? 65 : 78">
                  <v-img v-if="person.profile_path" :src="getImgUrl(person.profile_path)" aspect-ratio="1"
                         :lazy-src="getImgUrl(person.profile_path)"></v-img>
                  <span class="headline"
                        v-else>{{ person.name.split(" ")[0][0] }}{{ person.name.split(" ")[1][0] }}</span>
                </v-avatar>
                <v-avatar class="mx-2" v-if="movie.credits.cast.length - ($vuetify.breakpoint.smAndDown ? 3 : 6) &gt; 0"
                          :size="$vuetify.breakpoint.smAndDown ? 65 : 78"><span
                    class="title">+{{ movie.credits.cast.length - ($vuetify.breakpoint.smAndDown ? 3 : 6) }}</span>
                </v-avatar>
              </div>
            </v-btn>
            <v-chip-group>
              <v-chip v-for="provider in providers" :key="provider.provider_id">
                <v-avatar left>
                  <v-img :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"></v-img>
                </v-avatar>
                {{ provider.provider_name }}
              </v-chip>
            </v-chip-group>
          </v-col>

        </v-row>
      </v-container>
    </v-img>
  </v-main>
</template>

<script>
import axios from "axios";

const imageapi = 'https://source.unsplash.com/random'
const API_KEY = process.env.VUE_APP_API_KEY

export default {
  name: "ItemDetail",
  data() {
    return {
      colors: [],
      image: imageapi,
      movie: null,
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
            this.movie = response.data
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

<style scoped>

</style>
