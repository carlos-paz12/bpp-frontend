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
            const role = res.data.role?.toUpperCase();
            if (role === 'ADMIN' || role === 'TECNICO') {
              this.$router.push('/spe/api/admin/dashboardGerente');
            } else if (role === 'BOLSISTA') {
              this.$router.push('/spe/api/dashboardBolsista');
            } else {
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
