<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="marcarPonto">Marcar Ponto</button>
    <ul>
      <li v-for="r in registros" :key="r">{{ r }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
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
