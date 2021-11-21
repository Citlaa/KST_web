import TiposDePago from '@/components/Catalogos/TiposDePago';
import TiposCicloEscolar from '@/components/Catalogos/TiposCicloEscolar';
import TiposDeRecargos from '@/components/Catalogos/TiposDeRecargos'
import Grupos from '@/components/Administracion/Grupos'

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
]

export default routes;