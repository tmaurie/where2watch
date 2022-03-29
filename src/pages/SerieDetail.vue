<template>
  <v-main class="pa-0" v-if="loaded">
    <Detail  :providers="providers" :item-detail="serie" media_type="tv"/>

    <v-container class="mb-12" id="container" fluid>

      <v-toolbar class="transparent" flat>
        <v-toolbar-title>Seasons</v-toolbar-title>
      </v-toolbar>
      <v-row class="mb-16" no-gutters justify="center">

        <ItemCard
            @click.stop="season = true"
            v-for="(item, idx) in seasons"
            :key="idx"
            :id="item.id"
            :poster="item.poster_path"
            :title="item.name"
        >
        </ItemCard>
        <v-dialog
            v-model="season">
          <v-card>
            test
          </v-card>
        </v-dialog>
      </v-row>

    </v-container>

    <v-row no-gutters>

      <ResultList title="You may like" :loaded="loaded" :page="page" :path="path" type="tv" :results="similarShows.slice(0,5)"/>
    </v-row>

  </v-main>
</template>

<script>
import axios from "axios";
import Detail from "@/components/Detail";
import ResultList from "@/components/ResultList";
import ItemCard from "@/components/ItemCard";

const API_KEY = process.env.VUE_APP_API_KEY

export default {
  name: "ItemDetail",
  components: {ItemCard, ResultList, Detail},
  data() {
    return {
      colors: [],
      serie: null,
      loaded: false,
      similarShows: [],
      providers: [],
      seasons: [],
      videos: [],
      page: '1',
      path: '',
      season: false
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
              session_id : localStorage.getItem('session_id'),
              append_to_response: [
                'credits',
                'videos',
                'account_states'
              ].join(','),
            }
          })
          .then((response) => {
            this.serie = response.data
            this.videos = response.data.videos.results.filter(video => video.type === 'Trailer')
            this.seasons = response.data.seasons
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
          })
          .finally(() => (this.loaded = true))
    },
    getSimilarShows() {
      axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/recommendations`,
          {
            params: {
              api_key: API_KEY,
              page: this.page
            }
          })
          .then((response) => {
            this.similarShows = response.data.results
            this.loaded = true
          })
          .finally(() => (this.loaded = true));
    }
  },
  mounted() {
    this.getItemDetails()
    this.getSimilarShows()
  },
}
</script>

