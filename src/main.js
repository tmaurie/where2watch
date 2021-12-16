import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import VueRouter from 'vue-router';
import axios from "axios";
import Home from "@/pages/Home";
import WatchProvider from "@/pages/WatchProvider";
import MovieDetail from "@/pages/MovieDetail";
import SerieDetail from "@/pages/SerieDetail";
import VueMeta from "vue-meta";
import CustomSearch from "@/pages/CustomSearch";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/w/:id?', component: WatchProvider },
    { path: '/m/:id', component: MovieDetail },
    { path: '/s/:id', component: SerieDetail },
    { path: '/search', component: CustomSearch }
  ]
});

new Vue({
  vuetify,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
