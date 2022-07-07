import TiposDePago from '@/components/Catalogos/TiposDePago';
import TiposCicloEscolar from '@/components/Catalogos/TiposCicloEscolar';
import TiposDeRecargos from '@/components/Catalogos/TiposDeRecargos';
import TiposDePagos from '@/components/Administracion/ControlPagos';
import Grupos from '@/components/Administracion/Grupos';

const routes = [
    {
        name: 'TiposDePago',
        path: '/tiposDePago',
        component: TiposDePago
    },
    {
        name: 'TiposCicloEscolar',
        path: '/tiposCicloEscolar',
        component: TiposCicloEscolar
    },
    {
        name: 'TiposDeRecargos',
        path: '/tiposDeRecargos',
        component: TiposDeRecargos
    },
    {
        name: 'Grupos',
        path: '/grupos',
        component: Grupos
    },
    {
        name: 'TiposDePagos',
        path: '/tiposDePagos',
        component: TiposDePagos
    },
]

export default routes;