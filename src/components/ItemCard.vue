<template>

  <v-card
      width="200"
      rounded="xl"
  >
    <v-img
        :src="('https://image.tmdb.org/t/p/w300_and_h450_bestv2' +poster)"
    ></v-img>

    <v-card-title>
     {{title}}
    </v-card-title>

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
