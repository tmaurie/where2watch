<template>
  <v-img class="v-img--blurred" id="hero" :aspect-ratio="10"
         :src="`https://image.tmdb.org/t/p/original/${itemDetail.backdrop_path}`"
         gradient="to top, rgba(var(--bg-color),1) 15%, rgba(var(--bg-color),.7) 100%">
    <template v-slot:placeholder="">
      <v-row class="pa-3 ma-0 fill-height" justify="end" align="start">
        <v-progress-circular indeterminate="indeterminate" style="opacity: .25"></v-progress-circular>
      </v-row>
    </template>
    <v-container class="py-12" :class="$vuetify.breakpoint.xsOnly">
      <v-row class="py-6" align="center" justify="center">
        <v-col cols="12" sm="4" v-if="itemDetail.poster_path">
          <v-card elevation="15" rounded="xl">
            <v-img :src="getImgUrl" :lazy-src="getImgUrl" :aspect-ratio="2/3">
              <template v-slot:placeholder="">
                <v-row class="pa-3 ma-0 fill-height" justify="center" align="center">
                  <v-progress-circular indeterminate="indeterminate"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
        <v-col align-self="center">
          <h1 class="display-1 font-weight-bold">{{itemDetail.original_name || itemDetail.original_title}}</h1>
          <p v-if="itemDetail.overview">{{ itemDetail.overview }}</p>
          <div class="d-block">
            <h2 class="subtitle-1 d-inline" v-if="itemDetail.first_air_date" ><span class="font-weight-bold">{{
                new Date(itemDetail.first_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })
              }}</span><span class="font-weight-light" v-if="itemDetail.status"> ({{ itemDetail.status }})</span></h2>
            <h2 class="subtitle-1 d-inline" v-else-if="itemDetail.release_date" ><span class="font-weight-bold">{{
                new Date(itemDetail.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })
              }}</span><span class="font-weight-light" v-if="itemDetail.status"> ({{ itemDetail.status }})</span></h2>
            <h2 class="subtitle-1 font-weight-light" v-else>(N/A)</h2>
          </div>
          <div class="mx-n1 py-2">
            <v-chip class="ma-1" v-for="genre in itemDetail.genres" :key="genre.id" :small="$vuetify.breakpoint.smAndDown"
                    outlined="outlined" nuxt="nuxt">{{ genre.name }}
            </v-chip>
          </div>
          <v-btn class="mt-6" height="100" text="text" nuxt="nuxt" exact="exact"
                 :block="$vuetify.breakpoint.smAndDown">
            <div class="mx-n2">
              <v-avatar class="elevation-3 mx-2"
                        v-for="person in itemDetail.credits.cast.slice(0, $vuetify.breakpoint.smAndDown ? 3 : 6)"
                        :key="person.credit_id" :size="$vuetify.breakpoint.smAndDown ? 65 : 78">
                <v-img v-if="person.profile_path" :src="`https://image.tmdb.org/t/p/original/${person.profile_path}`"
                       aspect-ratio="1"
                       :lazy-src="getImgUrl"></v-img>
                <span class="headline"
                      v-else>{{ person.name.split(" ")[0][0] }}{{ person.name.split(" ")[1][0] }}</span>
              </v-avatar>
              <v-avatar class="mx-2" v-if="itemDetail.credits.cast.length - ($vuetify.breakpoint.smAndDown ? 3 : 6) &gt; 0"
                        :size="$vuetify.breakpoint.smAndDown ? 65 : 78"><span
                  class="title">+{{ itemDetail.credits.cast.length - ($vuetify.breakpoint.smAndDown ? 3 : 6) }}</span>
              </v-avatar>
            </div>
          </v-btn>
          <v-chip-group>
            <v-chip v-for="provider in providers" :key="provider.provider_id">
              <v-avatar left>
                <v-img :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"></v-img>
              </v-avatar>
              {{ provider.provider_name }}
            </v-chip>
          </v-chip-group>
        </v-col>

      </v-row>
    </v-container>
  </v-img>
</template>
<script>
export default {
  name: 'Detail',
  props: {
    getImgUrl: {},
    providers: {},
    itemDetail: {type: Function}
  }
}
</script>
