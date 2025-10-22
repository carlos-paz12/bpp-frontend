<template>
  <Header />

  <div class="center-container">
    <div class="rectangle">
      <h1 class="secondary">Cadastro de bolsista</h1>
      <input class="text-box" v-model="username" placeholder="Username" />
      <br /><br />
      <input class="text-box" v-model="name" placeholder="Nome" />
      <br /><br />
      <input class="text-box" v-model="email" type="email" placeholder="Email" />
      <br /><br />
      <input class="text-box" v-model="password" type="password" placeholder="Senha" />
      <br /><br />
      <button class="button-class" @click="cadastrarBolsista">Cadastrar</button>
      <p v-if="error" style="color:pink; font-style: italic; font-weight: bold;">{{ error }}</p>
    </div>
  </div>

  <div class="image-container">
    <img class="image" src="@/assets/img/strawberryicon.png" />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './items/Header.vue';

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
    Header,
  },

  data() {
    return {
      username: '',
      name: '', // Alterado de "nome" para "name"
      email: '',
      password: '',
      roles: 'BOLSISTA', //pegar o valor do option depois
      error: '',
    };
  },

  methods: {
   async cadastrarBolsista() {
  const token = localStorage.getItem('token');

  if (!token) {
    this.error = 'Token de autenticação não encontrado. Faça login novamente.';
    return;
  }

  if (!isTokenValid(token)) {
    // Limpar token inválido e redirecionar para login
    localStorage.removeItem('token');
    alert('Sua sessão expirou. Por favor, faça login novamente.');
    this.$router.push('/spe/api/auth/login');
    return;
  }

  console.log('Token recuperado:', token);

  try {
    const res = await axios.post(
      'http://localhost:8080/spe/api/admin/register',
      {
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password,
        roles: 'BOLSISTA',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      }
    );
    console.log('Bolsista cadastrado com sucesso:', res.data);
    this.error = ''; // Limpa o erro após o sucesso
  } catch (error) {
    console.error('Erro ao cadastrar bolsista:', error);

    // Captura os erros retornados pelo backend
    if (error.response?.data) {
      if (Array.isArray(error.response.data)) {
        // Se o backend retornar uma lista de erros
        this.error = error.response.data.map((err) => err.defaultMessage || err).join(', ');
      } else {
        // Se o backend retornar uma mensagem única
        this.error = error.response.data || 'Erro ao cadastrar bolsista. Tente novamente.';
      }
    } else {
      this.error = 'Erro ao cadastrar bolsista. Tente novamente.';
    }
  }
}
  },
};
</script>
