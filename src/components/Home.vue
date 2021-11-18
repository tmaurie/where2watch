<template>
  <v-container fluid>
    <v-row fill-height justify="center" align="center">
      <v-col cols="12" lg="6">

        <v-autocomplete
            label="Search"
            outlined
            rounded
            filled
            append-icon="mdi-magnify"
        >

        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  name: "Home",
}
</script>

<style scoped>

</style>
