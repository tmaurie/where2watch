<template>

  <v-list rounded>
    <v-list-item
      v-for="(item, idx) in list.slice(0,6)"
      :key="idx"
      link

    >
      {{item.title || item.name}} ({{item.release_date}})
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "ResultList",
  props : ['list']
}
</script>

<style scoped>

</style>
