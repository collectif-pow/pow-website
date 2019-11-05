import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// polyfills and utils
import 'normalize.css'
import '@/assets/base.scss'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()
import 'intersection-observer'
import './utils/height'

// directives and components
import { ObserveVisibility } from 'vue-observe-visibility'
Vue.directive('ov', ObserveVisibility)
import VueFullPage from 'vue-fullpage.js'
Vue.use(VueFullPage)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  async created() {
    await this.$store.dispatch('getData')
  },
}).$mount('#app')
