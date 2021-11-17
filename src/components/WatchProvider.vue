<template>
  <v-container fluid>
    <v-row no-gutters >
      <ItemCard
          v-for="(item, idx) in info"
          :key="idx"
          :poster="item.poster_path"
          :title="item.title"
      >


      </ItemCard>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import ItemCard from "@/components/ItemCard";

const API_KEY = process.env.VUE_APP_API_KEY
export default {


  name: "WatchProvider",
  components: {ItemCard},
  data() {
    return {
      loaded: false,
      info: null,
      region: "FR"
    }
  },
  mounted() {


    this.getByWatchProvider()

  },
  methods: {

    getRegion() {
      axios.get("http://ip-api.com/json").then(response => (this.region = response.data.countryCode))
    },
    getByWatchProvider() {
      const WATCH_PROVIDER_ID = this.$route.params.id
      axios.get("https://api.themoviedb.org/3/discover/movie?with_watch_providers=" + WATCH_PROVIDER_ID + "&watch_region=" + this.region + "&api_key=" + API_KEY)
          .then(response => (this.info = response.data.results))
          .finally(() => (this.loaded = true))
    }
  }
}


</script>

<style scoped>

</style>
