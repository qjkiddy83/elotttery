import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import CheckBets from '@/components/CheckBets'

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/checkbets',
      name: 'checkbets',
      component: CheckBets
    }
  ]
})
