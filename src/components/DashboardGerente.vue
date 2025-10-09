<template>
  <Header/>

  <ContentBlock>
    <h1>
      Últimos pontos registrados por bolsistas
    </h1>
    <ul>
        <li v-for="r in registros" :key="r">{{ r }}</li>
        <link rel="stylesheet" href="style.css">
    </ul>
    <br/>
    <a href="/novoUsuarioBolsista">
      <button class="button-class">Adicionar Usuário Bolsista</button>
    </a>
    
    <a href="../novoUsuarioGerente">
      <button class="button-class">Adicionar Usuário Gerente</button>
    </a>
  </ContentBlock>
  
  <!--
  <div class="center-container">
    <div class="dashboard-rectangle">
      <h1>Dashboard</h1>
      <okay so i just gotta add a place to add the users and see the last dashboards
      <ul>
        <li v-for="r in registros" :key="r">{{ r }}</li>
        <link rel="stylesheet" href="style.css">
      </ul>

    </div>
  </div>-->
</template>

<script>
import axios from 'axios';
import Header from './items/Header.vue';
import ContentBlock from './items/ContentBlock.vue';

export default {
  components: {
    Header, ContentBlock
  },

  data() {
    return { registros: [] }
  },
  async created() {
    await this.carregarRegistros()
  },
  methods: {
    async carregarRegistros() {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8080/api/ponto', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.registros = res.data.registros
    },
    async marcarPonto() {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/api/ponto/marcar', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(res.data.message)
      await this.carregarRegistros()
    }
  }
}
</script>



