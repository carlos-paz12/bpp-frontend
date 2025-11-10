<template>
  <Header />

  <div class="center-container">
    <div class="dashboard-rectangle">
      <h1>Dashboard</h1>

      <div style="align-self:center;">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora de Entrada</th>
              <th>Hora de Saída</th>
              <th>Total de Horas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(registro, index) in registros" :key="index">
              <td>{{ formatarData(registro.horasDeEntrada) }}</td>
              <td>{{ formatarHora(registro.horasDeEntrada) }}</td>
              <td>{{ registro.horasDeSaida ? formatarHora(registro.horasDeSaida) : '---' }}</td>
              <td>{{ registro.qtdDeHorasFeitas || '---' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2> {{ totalHoras }}</h2>
      <!-- Novo input para exibir o total -->
      <div>

      </div>

      <button class="button-class" @click="ativarButton('buttonTrigger')">
        {{ pontoAtivo ? 'Registrar Saída' : 'Registrar Entrada' }}
      </button>

      <Popup v-if="triggers.buttonTrigger" :changePopup="() => changePopup('buttonTrigger')">
        <h2>{{ mensagemPopup }}</h2>
      </Popup>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import Popup from '../components/items/Popup.vue'
import Header from '../components//items/Header.vue'

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
  components: { Header, Popup },

  setup() {
    const triggers = ref({ buttonTrigger: false })
    const changePopup = (trigger) => {
      triggers.value[trigger] = !triggers.value[trigger]
    }
    return { triggers, changePopup }
  },

  data() {
    return {
      registros: [],
      pontoAtivo: false,
      mensagemPopup: '',
      totalHoras: '', // Adicionado para armazenar o total de horas
    }
  },

  async created() {
    const estado = localStorage.getItem('pontoAtivo')
    this.pontoAtivo = estado === 'true'
    await this.carregarRegistros()
  },

  methods: {
    async carregarRegistros() {
      const token = localStorage.getItem('token')

      if (!isTokenValid(token)) {
        //limpar token inválido e redirecionar para login
        localStorage.removeItem('token')
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        this.$router.push('/spe/api/auth/login')
        return
      }

      try {
        // Faz as duas requisições simultaneamente
        const [res, total] = await Promise.all([
          axios.get('http://localhost:8080/spe/api/bolsista/meus-pontos', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8080/spe/api/bolsista/total-horas', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        // Atualiza os registros e o total de horas
        this.registros = res.data
        this.totalHoras = total.data // Atualiza o total de horas
      } catch (error) {
        console.error('Erro ao carregar registros:', error)
        this.$router.push('/spe/api/auth/login') // Redireciona para login em caso de erro
      }
    },

    async ativarButton(trigger) {
      const token = localStorage.getItem('token')
      let res

      if (!this.pontoAtivo) {
        res = await axios.post(
          'http://localhost:8080/spe/api/bolsista/entrada',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.mensagemPopup = 'Entrada registrada com sucesso!'
        this.pontoAtivo = true
      } else {
        res = await axios.post(
          'http://localhost:8080/spe/api/bolsista/saida',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.mensagemPopup = res.data.message || 'Saída registrada!'
        this.pontoAtivo = false
      }

      localStorage.setItem('pontoAtivo', this.pontoAtivo)
      await this.carregarRegistros()
      this.changePopup(trigger)
    },

    // 🕒 Função para formatar data (ex: 12/10/2025)
    formatarData(datetime) {
      return new Date(datetime).toLocaleDateString('pt-BR')
    },

    // ⏰ Função para formatar hora (ex: 08:00)
    formatarHora(datetime) {
      return new Date(datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    },
  },
}
</script>
