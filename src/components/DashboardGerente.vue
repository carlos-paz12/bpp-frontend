<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <Header/>

  <ContentBlock>
    <h1>Últimos pontos registrados por bolsistas</h1>

    <div style="align-self:center;">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Hora de Entrada</th>
            <th>Hora de Saída</th>
            <th>Total de Horas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, index) in registros" :key="index">
            <td>{{ registro.nome }}</td>
            <td>{{ formatarData(registro.horaDeEntrada) }}</td>
            <td>{{ formatarHora(registro.horaDeEntrada) }}</td>
            <td>{{ registro.horaDeSaida ? formatarHora(registro.horaDeSaida) : '---' }}</td>
            <td>{{ registro.qtdDeHorasFeitas !== null ? registro.qtdDeHorasFeitas + ' Hrs' : '---' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin-top: 20px;">
      <a href="/novoUsuarioBolsista">
        <button class="button-class">Adicionar Usuário Bolsista</button>
      </a>
      <a href="../novoUsuarioGerente">
        <button class="button-class">Adicionar Usuário Gerente</button>
      </a>
    </div>
  </ContentBlock>
</template>

<script>
import axios from 'axios';
import Header from './items/Header.vue';
import ContentBlock from './items/ContentBlock.vue';

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
    Header, ContentBlock
  },

  data() {
    return {
      registros: []
    }
  },

  async created() {
    await this.carregarRegistros();
  },

  methods: {
   async carregarRegistros() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/spe/api/admin/pontos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.registros = res.data;
   if (!isTokenValid(token)) {
      this.$router.push('/spe/api/auth/login');
      return;
    }

  } catch (error) {

      console.error('Erro na  requisição:', error.message);
    }
  }
},

    // Função para formatar data (ex: 12/10/2025)
    formatarData(datetime) {
      return new Date(datetime).toLocaleDateString('pt-BR');
    },

    // Função para formatar hora (ex: 08:00)
    formatarHora(datetime) {
      return new Date(datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  }
</script>
