<template>
  <v-container class="mb-16" id="container" fluid>

    <v-row
        justify="center"
        v-if="loaded"
    >

      <ItemCard
          v-for="(item, idx) in results"
          :key="idx"
          :id="item.id"
          :poster="item.poster_path"
          :title="type  === 'movie' || item.media_type === 'movie' ? item.title : item.name"
          :path="type  === 'movie' || item.media_type === 'movie' ? 'm' : 's'"
      >
      </ItemCard>
    </v-row>

  </v-container>
</template>
<script>
import ItemCard from "@/components/ItemCard"

export default {
  name: 'ResultList',
  components: {ItemCard},
  data() {
    return {
      media_type: ''
    }
  },
  props: {
    loaded: {},
    path: {},
    results: {},
    toggle: {},
    type: {},

  },
}
</script>
<style>

</style>
