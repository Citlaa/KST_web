import Vue from 'vue'
import VueRouter from 'vue-router'
import Vue2Filters from 'vue2-filters'
import { BootstrapVue } from 'bootstrap-vue'
import VueSimpleAlert from "vue-simple-alert";
import store from "./store/index.js"

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/js/all'

import App from './App.vue'
import cargando from './components/Comunes/Cargando.vue'
import TiposModalidad from './components/Catalogos/Selects/TiposModalidad.vue'
import TiposCicloEscolar from './components/Catalogos/Selects/TiposCicloEscolar.vue'
import TiposGrupo from './components/Catalogos/Selects/TiposGrupo.vue'
import TiposNivel from './components/Catalogos/Selects/TiposNivel.vue'
import TiposPeriodo from './components/Catalogos/Selects/TiposPeriodo.vue'
import TiposGrado from './components/Catalogos/Selects/TiposGrado.vue'
import TiposEspecialidad from './components/Catalogos/Selects/TiposEspecialidad.vue'
import Usuarios from './components/Catalogos/Selects/usuarios.vue';

import BaseDialog from './components/Comunes/BaseDialogo.vue';

Vue.use(VueRouter)
Vue.use(Vue2Filters)
Vue.use(VueSimpleAlert)
Vue.use(BootstrapVue)

Vue.component('cargando', cargando)
Vue.component('TiposModalidad', TiposModalidad)
Vue.component('TiposCicloEscolar', TiposCicloEscolar)
Vue.component('TiposGrupo', TiposGrupo)
Vue.component('TiposNivel', TiposNivel)
Vue.component('TiposPeriodo', TiposPeriodo)
Vue.component('TiposGrado', TiposGrado)
Vue.component('TiposEspecialidad', TiposEspecialidad)
Vue.component('usuarios', Usuarios)

Vue.component('base-dialog', BaseDialog);

Vue.config.productionTip = false

import routes from '@/routes/routes.js'
const router = new VueRouter({ mode: 'history', routes: routes })

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {        
    next('/');
  } 
  else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {           
    next('/inicio');
  }
  else{    
      next();
  }
});

new Vue({  
  router,
  store,
  render: h => h(App),
}).$mount('#app')
