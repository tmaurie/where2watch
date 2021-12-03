<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">

<!--        <v-btn  @click="getRandom"> go to random</v-btn>-->
        <v-carousel>
          <v-carousel-item
              v-for="(color, i) in colors"
              :key="color"
          >
            <v-sheet
                :color="color"
                height="100%"
                tile
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
              >
                <div class="text-h2">
                  Slide {{ i + 1 }}
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <v-icon v-text="$vuetify.icons.disneySvg"></v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

const API_KEY = process.env.VUE_APP_API_KEY
import axios from "axios";

export default {

  name: "Home",
  metaInfo: {
    title: 'Home'
  },
  data() {
    return {
      randomId: null,
      colors: [
        'primary',
        'secondary',
        'yellow darzken-2',
        'red',
        'orange',
      ],
      popular: []
    }
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
      axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: API_KEY,

        }
      }).then((response) => {
        this.popular = response.data.results
      })
    }
  }
}
</script>

<style>

</style>
