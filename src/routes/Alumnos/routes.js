import RegistroDeAlumnos from '@/components/Alumnos/RegistroDeAlumnos';
import RegistroDeTutores from '@/components/Alumnos/Tutores/RegistroDeTutores';

const routes = [
    {
        name: 'RegistroDeAlumnos',
        path: '/registroDeAlumnos',
        component: RegistroDeAlumnos,
        meta: { requiresAuth: true }
    },
    {
        name: 'RegistroDeTutores',
        path: '/registroDeTutores',
        component: RegistroDeTutores,
        meta: { requiresAuth: true }
    }
]

export default routes;