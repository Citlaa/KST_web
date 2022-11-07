import Vue from "vue";
import Router from "vue-router";
import administracionRoutes from "@/routes/Administracion/routes.js";
import alumnosRoutes from "@/routes/Alumnos/routes.js";
import reportes from "@/routes/Reportes/routes.js";

import Index from "@/components/Inicio.vue";
import NotFound from "../paginas/NotFound.vue";
import Login from "@/components/Login/login.vue"

Vue.use(Router);

const baseRoutes = [
  {
    name: "Login",
    path: "/",
    component: Login,
    meta: { requiresUnauth: true }
  },
  {
    name: "Index",
    path: "/inicio",
    component: Index,    
    meta: { requiresAuth: true }
  },
  { path: "/:notFound(.*)", component: NotFound },
];

var routes = baseRoutes
  .concat(administracionRoutes)
  .concat(alumnosRoutes)
  .concat(reportes);

export default routes;
