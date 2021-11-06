<template>
  <div>
    <v-navigation-drawer
        app
        v-model="drawer"
        temporary
        color="primary"
        dark

    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="white"
        elevation="0"

    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Hello-where2watch</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-switch
          v-model="$vuetify.theme.dark"
          color="white"
          inset
      ></v-switch>

    </v-app-bar>


  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    selectedItem: 0,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
