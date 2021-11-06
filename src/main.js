import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import VueRouter from 'vue-router';
import axios from "axios";
import Home from "@/components/Home";

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [
    { path: '/', component: Home }
  ]
});

new Vue({
  vuetify,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
