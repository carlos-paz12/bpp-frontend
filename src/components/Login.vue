<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Usuário" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="login">Entrar</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8080/api/login', {
          username: this.username,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response?.data?.error || 'Erro de conexão'
      }
    }
  }
}
</script>
