import ListaDeGrupo from '@/components/Reportes/ListaDeGrupo/ListaDeGrupo';

const routes = [
    {
        name: 'ListaDeGrupo',
        path: '/listaDeGrupo',
        component: ListaDeGrupo,
        meta: { requiresAuth: true }
    },
]

export default routes;