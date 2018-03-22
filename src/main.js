// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import enlang from './langs/en';
import arlang from './langs/ar';

const messages = {
  en: enlang,
  ar: arlang
}

function getLang(){//默认语言
  return messages[navigator.languages[0]]?navigator.languages[0]:'en';
}

const i18n = new VueI18n({
  //定义默认语言
  locale: getLang(), 
  messages
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
