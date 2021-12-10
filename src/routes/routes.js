import Vue from "vue";
import Router from "vue-router";
import administracionRoutes from "@/routes/Administracion/routes.js";
import alumnosRoutes from "@/routes/Alumnos/routes.js";

import Index from "@/components/Inicio.vue";
import NotFound from "../paginas/NotFound.vue";

Vue.use(Router);

const baseRoutes = [
  {
    name: "Index",
    path: "/",
    component: Index,
  },
  { path:'/:notFound(.*)', component: NotFound }
];

var routes = baseRoutes.concat(administracionRoutes).concat(alumnosRoutes);
// var routes = baseRoutes.concat(alumnosRoutes);

export default routes;
