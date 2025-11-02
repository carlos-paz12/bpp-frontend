export function isTokenValid(token) {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        return decoded.exp > currentTime
    } catch (error) {
        console.error('Erro ao verificar validade do token:', error)
        return false
    }
}

export function getToken() {
    return localStorage.getItem('token')
}

export function logoutAndRedirect(router) {
    localStorage.removeItem('token')
    alert('Sua sessão expirou. Faça login novamente.')
    router.push('/spe/api/auth/login')
}
