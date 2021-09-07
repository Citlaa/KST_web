import TiposDePago from '@/components/Catalogos/TiposDePago';
import TiposCicloEscolar from '@/components/Catalogos/TiposCicloEscolar';

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
]

export default routes;