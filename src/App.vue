<template>
  <!-- App.vue -->

  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <AppNavDrawer/>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->


        <!-- If using vue-router -->
        <router-view :key="$route.fullPath"></router-view>
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
@import "assets/styles/custom.css";
</style>
