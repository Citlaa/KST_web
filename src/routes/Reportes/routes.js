import ListaDeGrupo from '@/components/Reportes/ListaDeGrupo/ListaDeGrupo';
import PersonasAdeudo from '../../components/Reportes/PersonasAdueudo/PersonasAdeudo';

const routes = [
    {
        name: 'ListaDeGrupo',
        path: '/listaDeGrupo',
        component: ListaDeGrupo,
        meta: { requiresAuth: true }
    },
    {
        name: 'PersonasAdeudo',
        path: '/personasAdeudo',
        component: PersonasAdeudo,
        meta: { requiresAuth: true }
    },
]

export default routes;