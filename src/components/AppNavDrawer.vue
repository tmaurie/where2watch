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

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list shaped>


        <v-list-item to="/w/">
          <v-list-item-icon>
            <v-icon>mdi-binoculars</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Discover</v-list-item-title>
        </v-list-item>

        <v-list-group
            :value="false"
            prepend-icon="mdi-television-play"
            no-action

        >
          <template v-slot:activator>
            <v-list-item-title>Platforms</v-list-item-title>
          </template>

          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              link
              :to="item.route"
          >
            <v-list-item-title v-text="item.text"></v-list-item-title>

          </v-list-item>


        </v-list-group>
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

      <v-toolbar-title>W2W</v-toolbar-title>
      <v-spacer></v-spacer>
      <SearchBox/>
      <v-spacer></v-spacer>

      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">

        <v-icon>
          {{ $vuetify.theme.dark ? "mdi-brightness-5" : "mdi-brightness-3" }}
        </v-icon>

      </v-btn>
    </v-app-bar>


  </div>
</template>
<script>
import SearchBox from "@/components/SearchBox";
export default {
  components: {SearchBox},
  data: () => ({
    drawer: false,
    selectedItem: 0,
    items: [
      {text: 'Netflix',  route: '/w/8'},
      {text: 'Prime Videos',  route: '/w/119'},
      {text: 'Disney+',  route: '/w/337'},
    ],
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
