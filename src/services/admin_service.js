import api from '@/api/index'
import { getToken, isTokenValid } from './auth_service'

export async function cadastrarAdmin({ username, name, email, password, router }) {
    const token = getToken()
    if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.')
    }

    if (!isTokenValid(token)) {
        localStorage.removeItem('token')
        alert('Sua sessão expirou. Por favor, faça login novamente.')
        router.push('/spe/api/auth/login')
        return
    }

    const { data } = await api.post('/admin/register', {
        username,
        name,
        email,
        password,
        roles: 'ADMIN',
    })

    return data
}
