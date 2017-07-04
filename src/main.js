// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/'

Vue.use(Vuex)
Vue.config.productionTip = false

// Need to declare this component globally to use recursively
import Outcome from './components/model/Outcome'
Vue.component('outcome', Outcome)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
