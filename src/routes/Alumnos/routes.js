import RegistroDeAlumnos from '@/components/Alumnos/RegistroDeAlumnos';

const routes = [
    {
        name: 'RegistroDeAlumnos',
        path: '/registroDeAlumnos',
        component: RegistroDeAlumnos,
        meta: { requiresAuth: true }
    }   
]

export default routes;