import Vue from 'vue'
import App from './App.v3.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
