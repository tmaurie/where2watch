<template>
  <v-container id="container" fluid>
    <v-row
        v-if="loaded"
        no-gutters
        justify="center"
    >


      <v-col
          v-for="(item, idx) in results"
          :key="idx">
        <ItemCard
            :id="item.id"
            :poster="item.poster_path"
            :title="item.title"
        >
        </ItemCard>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-skeleton-loader
          v-for="i in 20"
          :key="i"
          class="mx-auto my-6 rounded-xl"
          width="374"
          type="card">
      </v-skeleton-loader>
    </v-row>
    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="info.total_pages"
          total-visible="6"
          @input="handlePageChange"
      ></v-pagination>
    </div>
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
      info: [],
      results: null,
      region: "FR",
      page: 1,
    }
  },
  mounted() {

    this.getByWatchProvider()

  },
  beforeMount() {
    this.getRegion()
    console.log(this.region)
  },
  methods: {

    handlePageChange(value) {
      this.page = value
      this.getByWatchProvider()
    },
    getRegion() {
      axios.get("http://ip-api.com/json").then(response => (this.region = response.data.countryCode))
    },
    getByWatchProvider() {
      const WATCH_PROVIDER_ID = this.$route.params.id
      axios.get("https://api.themoviedb.org/3/discover/movie?with_watch_providers=" + WATCH_PROVIDER_ID + "&watch_region=" + this.region + "&api_key=" + API_KEY + "&page=" + this.page)
          .then((response) => {
            this.results = response.data.results
            this.info = response.data
          })
          .finally(() => (this.loaded = true))
    }
  }
}


</script>

<style scoped>
#container {
  width: 1500px;
}
</style>
