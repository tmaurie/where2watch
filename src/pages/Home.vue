<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">
        <SearchBox/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import SearchBox from "@/components/SearchBox";

export default {

  name: "Home",
  components: {SearchBox},
}
</script>

<style>

</style>
