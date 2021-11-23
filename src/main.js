import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import VueRouter from 'vue-router';
import axios from "axios";
import Home from "@/components/Home";
import WatchProvider from "@/components/WatchProvider";
import ItemDetail from "@/components/ItemDetail";

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/w/:id', component: WatchProvider },
    { path: '/m/:id', component: ItemDetail }
  ]
});

new Vue({
  vuetify,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
