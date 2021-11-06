<template>
  <!-- App.vue -->

  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <AppNavDrawer/>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>

</template>

<script>

import AppNavDrawer from "@/components/AppNavDrawer";
export default {
  name: 'App',
  components: {
    AppNavDrawer

  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style>

</style>
