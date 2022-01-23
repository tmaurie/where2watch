<template>
  <v-main>

    {{castInfo.name}}
  </v-main>
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
            baseURL : BASE_URL,
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
