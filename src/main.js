// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Records from './components/Records'
import VueResource from 'vue-resource'
import vCookie from 'vue-cookie'
import vScroll from 'vue-scroll'
import './style.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(vCookie)
Vue.use(vScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Records/>',
  components: { Records }
})
