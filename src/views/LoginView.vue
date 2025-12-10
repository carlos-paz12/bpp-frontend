<template>
  <div>
    <Header />
    <div class="center-container">
      <div class="rectangle">
        <h1 class="secondary">Login</h1>
        <input class="text-box" v-model="username" placeholder="Usuário" />
        <br /><br />
        <input class="text-box" v-model="password" type="password" placeholder="Senha" />
        <br /><br />
        <button class="button-class" @click="login">Entrar</button>
        <p v-if="error" style="color:pink; font-style: italic, bold;">{{ error }}</p>
      </div>
    </div>
    <div class="image-container">
      <img class="image" src="@/assets/img/strawberryicon.png" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/items/Header.vue';

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

        let json = await res.data;
        console.log(json);


          localStorage.setItem('token', json.token);
          localStorage.setItem('role', json.role);
          
          const role = json.role?.toUpperCase();
          
          if (role === 'ADMIN') {

            this.$router.push('/admin/dashboard');

          } else if (role === 'BOLSISTA') {

            this.$router.push('/bolsista/dashboard');

          } else {

            this.$router.push('/login');

          }

      } catch (err) {
        console.error('Erro na requisição:', err);
        this.error = err.response?.data?.error || 'Username ou senha inválidos';
      }
    },
  },
};
</script>
