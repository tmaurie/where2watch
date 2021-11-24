<template>


  <v-card
      class="mx-auto my-4 "
      width="250"
      rounded="xl"

      :to='`/${path}/${id}`'
  >
    <v-img
        :lazy-src="('https://image.tmdb.org/t/p/w300_and_h450_bestv2' +poster)"
        :src="('https://image.tmdb.org/t/p/w300_and_h450_bestv2' +poster)"
    ></v-img>

    <v-card-text>
      {{ title }} {{ type }} {{ path }}
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "ItemCard",
  props: ['id', 'title', 'poster', 'type','path'],


}
</script>

<style scoped>

</style>
