import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
// import '@fortawesome/fontawesome-free/js/all.min.js';
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

import App from './App.vue'

import routes from './routes'
import store from './store'

export const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})