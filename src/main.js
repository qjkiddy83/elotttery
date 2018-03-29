// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


import lang from './langs/index';
const i18n = new VueI18n(lang.init);

Vue.config.productionTip = false

import $ from 'jquery';
Vue.prototype.$ = $;
Vue.prototype.nf = function(num){
  return num<10?`0${num}`:num;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
