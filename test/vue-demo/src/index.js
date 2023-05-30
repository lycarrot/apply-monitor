import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Monitor from '@apply-monitor/monitor'

new Monitor({
  url: 'http://localhost:8080/api/collect/info/detail',
  project: 'testvue',
  version: '1.0.2',
  isVue: true,
  vue: Vue,
  // isCollectPer: false,
})

new Vue({
  // el: '#app',
  router,
  render: (h) => h(App),
})
