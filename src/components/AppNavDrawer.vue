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

      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list shaped>

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
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block href="https://github.com/tmaurie/hello-where2watch" target="_blank">
            <v-icon>mdi-github</v-icon>
            Github
          </v-btn>
        </div>
      </template>
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
      {text: 'Full Movie List', icon: 'mdi-movie-open', route: '/w/ '},
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
