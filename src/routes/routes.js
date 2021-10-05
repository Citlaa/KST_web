import Vue from 'vue';
import Router from 'vue-router';
import administracionRoutes from '@/routes/Administracion/routes.js';

import Index from '@/components/Inicio.vue'

Vue.use(Router);

const baseRoutes = [
    {
        name: 'Index',
        path: '/',
        component: Index
      },
];
 
var routes = baseRoutes.concat(administracionRoutes);

export default routes;