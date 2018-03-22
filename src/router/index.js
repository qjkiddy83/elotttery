import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import CheckBets from '@/components/CheckBets'
import BetsResult from '@/components/BetsResult'
import Wallet from '@/components/Wallet'
import Settings from '@/components/Settings'
import Deposit from '@/components/Deposit'
import Transactions from '@/components/Transactions'
import Profile from '@/components/Profile'
import Bets from '@/components/Bets'

Vue.use(Router)

export default new Router({
	// mode:'history',
  routes: [
    { path: '*', component: Index },//处置404
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/checkbets',
      name: 'checkbets',
      component: CheckBets
    },
    {
      path: '/betsresult',
      name: 'betsresult',
      component: BetsResult
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/bets',
      name: 'bets',
      component: Bets
    }
  ]
})
