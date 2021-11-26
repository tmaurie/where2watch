<template>
  <v-text-field
      label="Search"
      outlined
      rounded
      append-icon="mdi-magnify"
      @input="input"
  >

  </v-text-field>
</template>
<script>

export default {
  name: 'SearchBox',
  props : ['input']

}
</script>
