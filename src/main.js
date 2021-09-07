import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/js/all'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

import routes from '@/routes/routes.js'
// const routes = [  
//   {
//     name: 'Index',
//     path: '/',
//     component: Index
//   },
// ];
 
const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({  
  router,
  render: h => h(App),
}).$mount('#app')
