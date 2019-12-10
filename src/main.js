// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
// Third-party components
import BootstrapVue from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
// Custom components
import VueHighchart from './components/vue-highchart/VueHighchart'

import App from './App'
import router from './router/index'
import store from './store'

// todo
// cssVars()

Vue.use(require('vue-moment'));
Vue.use(BootstrapVue);
Vue.use(PerfectScrollbar);

// Components Registry
Vue.component('vue-highchart', VueHighchart);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
