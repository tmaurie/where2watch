<template>

  <v-hover v-slot:default="{ hover }">

    <v-card flat width="200" :to='`/${path}/${id}`'
            :active-class="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
            :color="hover  ? $vuetify.theme.dark ? 'primary' : 'primary' : 'transparent'">
      <v-container fluid class="pa-1">
        <v-row no-gutters align-content="center">
          <v-col cols="12">
            <v-card
                elevation="12"

            >
              <v-img
                  :aspect-ratio="2/3" width='100%'
                  :lazy-src="('https://image.tmdb.org/t/p/w200' +poster)"
                  :src="('https://image.tmdb.org/t/p/w200' +poster)"
              >
                <template v-slot:placeholder>
                  <v-row class="pa-3 ma-0 fill-height" justify="start" align="start">
                    <v-progress-circular indeterminate="indeterminate"></v-progress-circular>
                  </v-row>
                </template>
                <v-overlay :value='hover' absolute opacity='.75'
                           :color='$vuetify.theme.dark ? "grey darken-4" : "grey lighten-3"'
                           :light='$vuetify.theme.light' :dark='$vuetify.theme.dark'>

                  <v-container fluid>

                    <v-row dense justify="center">

                      <v-icon v-if="path==='m'">mdi-movie-open</v-icon>
                      <v-icon v-else>mdi-television-classic</v-icon>

                    </v-row>
                    <v-row dense justify="center" > {{ title }}</v-row>

                  </v-container>
                </v-overlay>

              </v-img>
            </v-card>
          </v-col>


        </v-row>

      </v-container>

    </v-card>

  </v-hover>
</template>

<script>
export default {
  name: "ItemCard",
  props: ['id', 'title', 'poster', 'type', 'path'],


}
</script>

<style scoped>

</style>
