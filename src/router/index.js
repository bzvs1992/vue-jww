import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import Records from '@/components/Records'
import Lee from '@/components/Lee'
// import Prize from '@/components/Prize'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Game',
      component: Game
    },
    {
      path: '/record',
      name: 'Records',
      component: Records
    },
    {
      path: '/nopay',
      name: 'Lee',
      component: Lee
    }
  ]
})
