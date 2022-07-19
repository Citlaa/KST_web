import TiposDePago from "@/components/Catalogos/TiposDePago";
import TiposCicloEscolar from "@/components/Catalogos/TiposCicloEscolar";
import TiposDeRecargos from "@/components/Catalogos/TiposDeRecargos";
import TiposDePagos from "@/components/Administracion/ControlPagos";
import Grupos from "@/components/Administracion/Grupos";

const routes = [
  {
    name: "TiposDePago",
    path: "/tiposDePago",
    component: TiposDePago,
    meta: { requiresAuth: true },
  },
  {
    name: "TiposCicloEscolar",
    path: "/tiposCicloEscolar",
    component: TiposCicloEscolar,    
    meta: { requiresAuth: true }
  },
  {
    name: "TiposDeRecargos",
    path: "/tiposDeRecargos",
    component: TiposDeRecargos,
    meta: { requiresAuth: true }
  },
  {
    name: "Grupos",
    path: "/grupos",
    component: Grupos,
    meta: { requiresAuth: true }
  },
  {
    name: "TiposDePagos",
    path: "/tiposDePagos",
    component: TiposDePagos,
    meta: { requiresAuth: true }
  },
];

export default routes;
