// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style.css'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from './store/index'
import vScroll from 'vue-scroll'
import vCookie from 'vue-cookie'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(vScroll)
Vue.use(vCookie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store: store
})
