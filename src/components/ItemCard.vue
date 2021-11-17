<template>


  <v-card
      class="mx-auto my-4 "
      width="250"
      rounded="xl"
  >
    <v-img
        :lazy-src="('https://image.tmdb.org/t/p/w300_and_h450_bestv2' +poster)"
        :src="('https://image.tmdb.org/t/p/w300_and_h450_bestv2' +poster)"
    ></v-img>

    <v-card-text>
     {{title}}
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "ItemCard",
  props: ['title','poster'],

}
</script>

<style scoped>

</style>
