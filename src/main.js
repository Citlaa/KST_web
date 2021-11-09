import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import VueSimpleAlert from "vue-simple-alert";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/js/all'

import App from './App.vue'
import TiposModalidad from './components/Catalogos/Selects/TiposModalidad.vue'
import TiposCicloEscolar from './components/Catalogos/Selects/TiposCicloEscolar.vue'
import TiposGrupo from './components/Catalogos/Selects/TiposGrupo.vue'
import TiposNivel from './components/Catalogos/Selects/TiposNivel.vue'
import TiposPeriodo from './components/Catalogos/Selects/TiposPeriodo.vue'
import TiposGrado from './components/Catalogos/Selects/TiposGrado.vue'
import TiposEspecialidad from './components/Catalogos/Selects/TiposEspecialidad.vue'

Vue.use(VueRouter)
Vue.use(VueSimpleAlert)
Vue.use(BootstrapVue)

Vue.component('TiposModalidad', TiposModalidad)
Vue.component('TiposCicloEscolar', TiposCicloEscolar)
Vue.component('TiposGrupo', TiposGrupo)
Vue.component('TiposNivel', TiposNivel)
Vue.component('TiposPeriodo', TiposPeriodo)
Vue.component('TiposGrado', TiposGrado)
Vue.component('TiposEspecialidad', TiposEspecialidad)

Vue.config.productionTip = false

import routes from '@/routes/routes.js'
const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({  
  router,
  render: h => h(App),
}).$mount('#app')
