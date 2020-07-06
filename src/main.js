import Vue from 'vue';
import VueRouter from 'vue-router';
import MdButton from 'vue-material/dist/components/MdButton';
import MdCheckbox from 'vue-material/dist/components/MdCheckbox';
import MdContent from 'vue-material/dist/components/MdContent';
import MdDialog from 'vue-material/dist/components/MdDialog';
import MdDrawer from 'vue-material/dist/components/MdDrawer';
import MdField from 'vue-material/dist/components/MdField';
import MdMenu from 'vue-material/dist/components/MdMenu';
import MdSpeedDial from 'vue-material/dist/components/MdSpeedDial';
import MdToolbar from 'vue-material/dist/components/MdToolbar';
import MdList from 'vue-material/dist/components/MdList';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@fortawesome/fontawesome-free/js/solid.min.js';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import App from './App.vue'

import routes from './routes'
import store from './store'

export const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(MdButton);
Vue.use(MdCheckbox);
Vue.use(MdContent);
Vue.use(MdDialog);
Vue.use(MdDrawer);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdSpeedDial);
Vue.use(MdToolbar);
Vue.use(MdList);

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})