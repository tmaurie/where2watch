<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <AppNavDrawer/>
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>

</template>

<script>

import AppNavDrawer from "@/components/AppNavDrawer";

export default {
  name: 'App',
  metaInfo: {
    title: 'hellow2w',
    titleTemplate: '%s | W2W'
  },
  components: {
    AppNavDrawer

  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style>
@import "assets/styles/custom.css";
</style>
