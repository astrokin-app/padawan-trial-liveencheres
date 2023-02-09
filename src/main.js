import Vue from 'vue'
import App from './App.vue'
import router from '../routes'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import KonamiCode from 'vue-konami-code'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.use(KonamiCode, {callback: function () {
  alert('Snake? Snake!? Snaaaake!')
}})

new Vue({
  router,
  pinia,
  render: h => h(App),
}).$mount('#app')
