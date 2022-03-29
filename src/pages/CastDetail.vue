<template>
  <v-container class="py-12" :class="$vuetify.breakpoint.xsOnly">

    <v-row>

      <v-card
          class="mx-auto pa-3"
          max-width="1000"

      >
        <v-list-item >


            <v-img class="rounded-lg" max-width="200" :src="`https://image.tmdb.org/t/p/w200/${castInfo.profile_path}`"></v-img>
          <v-list-item-content>

            <v-list-item-title ><h3>{{ castInfo.name }}</h3>

            </v-list-item-title>
          </v-list-item-content>


        </v-list-item>



      </v-card>
    </v-row>
<v-row class="text-justify">

  {{castInfo.biography}}

</v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const API_KEY = process.env.VUE_APP_API_KEY
const BASE_URL = process.env.VUE_APP_BASE_URL

export default {
  name: "CastDetail",

  data() {
    return {
      castInfo: []
    }
  },

  mounted() {
    this.getCastDetail()
  },
  methods: {
    getCastDetail() {
      axios.get(`/person/${this.$route.params.id}`,
          {
            baseURL: BASE_URL,
            params: {
              api_key: API_KEY
            }
          }).then((response) => {
        this.castInfo = response.data
      })
    }
  }

}
</script>

<style scoped>

</style>
