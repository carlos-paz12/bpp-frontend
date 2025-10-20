<template>
<div>
  <Header/>
  <div class="center-container">
    <div class="rectangle">
      <h1 class="secondary">Login</h1>
      <input class="text-box" v-model="username" placeholder="Usuário" />
      <br/><br/>
      <input class="text-box" v-model="password" type="password" placeholder="Senha" />
      <br/><br/>
      <button class="button-class" @click="login">Entrar</button>
      <p v-if="error" style="color:pink; font-style: italic, bold;">{{ error }}</p>
    </div>
  </div>
  <div class="image-container">
    <img class="image" src = "@/assets/img/strawberryicon.png"/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Header from './items/Header.vue';

// Função para verificar se o token é válido
function isTokenValid(token) {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
    const currentTime = Date.now() / 1000; // Timestamp atual em segundos
    return decoded.exp > currentTime; // Retorna true se o token ainda não expirou
  } catch (error) {
    console.error('Erro ao verificar validade do token:', error);
    return false; // Retorna false se o token for inválido
  }
}

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
  },

  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },

  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8080/auth/login', {
          username: this.username,
          password: this.password,
        });

        console.log('Resposta do backend:', res.data);

        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.role);

          if (isTokenValid(res.data.token)) {
            const role = res.data.role?.toUpperCase();
            if (role === 'ADMIN' || role === 'TECNICO') {
              this.$router.push('/spe/api/admin/dashboardGerente');
            } else if (role === 'BOLSISTA') {
              this.$router.push('/spe/api/dashboardBolsista');
            } else {
              this.$router.push('/spe/api/auth/login');
            }
          } else {
            this.error = 'Token expirado. Por favor, faça login novamente.';
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            this.$router.push('/spe/api/auth/login');
          }
        } else {
          this.error = 'Token não retornado pelo servidor';
        }
      } catch (err) {
        console.error('Erro na requisição:', err.response);
        this.error = err.response?.data?.error || 'Username ou senha inválidos';
      }
    },
  },
};
</script>
