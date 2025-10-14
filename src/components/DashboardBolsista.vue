<template>
  <Header />

  <div class="center-container">
    <div class="dashboard-rectangle">
      <h1>Meus Pontos</h1>
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
      <h1>Dashboard</h1>

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
import Popup from './items/Popup.vue'
import Header from './items/Header.vue'

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
      const res = await axios.get('http://localhost:8080/spe/api/bolsista/meus-pontos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      // agora os dados vêm direto do backend (um array)
      this.registros = res.data
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
