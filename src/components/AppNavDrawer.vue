<template>
  <div>
    <v-navigation-drawer
        app
        v-model="drawer"
        temporary

    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Where2Watch
          </v-list-item-title>
          <v-list-item-subtitle>
            Menu
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item-group
          v-model="group"
          active-class="primary--text "
      >

        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
        >


          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar
        app
        elevation="0"
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Hello-where2watch</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-switch
          v-model="$vuetify.theme.dark"
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
    items: [
      {text: 'Netflix', icon: 'mdi-netflix', route: '/w/8'},
      {text: 'Prime Videos', icon: 'mdi-netflix', route: '/w/119'},
      {text: 'Disney+', icon: 'mdi-netflix', route: '/w/337'},
    ],
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
