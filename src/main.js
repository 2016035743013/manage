
import Vue from 'vue'
import VCharts from 'v-charts'
Vue.use(VCharts)
import App from './App'

import ElementUI  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import $ from 'jquery'
Vue.prototype.$ = $;

import router from './router/index'

import vuescroll from 'vuescroll';
Vue.component('vuescroll', vuescroll);

import {store} from './store/index'
Vue.config.productionTip = false

import Bomb from 'hydrogen-js-sdk'
Bomb.initialize('878dfb3e025e2248', '123456', 'fdacd817d9959f0299e91bf400e97f99');
Vue.prototype.Bomb = Bomb;


/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
