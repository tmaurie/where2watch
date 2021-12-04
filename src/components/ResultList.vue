<template>
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
          :title="type  === 'movie' || item.media_type === 'movie' ? item.title : item.name"
          :path="type  === 'movie' || item.media_type === 'movie' ? 'm' : 's'"
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
</template>
<script>
import ItemCard from "@/components/ItemCard"

export default {
  name: 'ResultList',
  components: {ItemCard},
  data () {
    return{
      media_type : ''
    }
  },
  props: {
    loaded: {},
    path: {},
    results: {},
    toggle: {},
    type : {},

  },
}
</script>
