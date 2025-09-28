<template>
<div>
  <div class="top-container">
    <h1 class="menu">
      ⋆ ˚｡⋆୨୧˚  PONTEIRO ˚୨୧⋆｡˚ ⋆
    </h1>
  </div>
  <div class="center-container">
    <div class="rectangle">
      <br/>
      <h1 class="secondary">Login</h1>
      <input class="text-box" v-model="username" placeholder="Usuário" />
      <br/><br/>
      <input class="text-box" v-model="password" type="password" placeholder="Senha" />
      <br/><br/>
      <button style="background-color: pink;" @click="login">Entrar</button>
      <p v-if="error" style="color:pink; font-style: italic, bold;">{{ error }}</p>
    </div>
  </div>
  <div class="image-container">
    <img class="image" height="80px" src = "@/assets/img/strawberryicon.png"/>
  </div>
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

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  /*background-color: pink;*/
  background-image: url('@/assets/img/pink-strawberries.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.secondary {
  color: pink;
}

.page {
  display: flex;
  flex-direction: column;
  height: 100%
}
.center-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60vh;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: pink;
}

.top-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: flex-start;
  text-align: center;
  height: 15vh;
  font-family: Arial, Helvetica, sans-serif;
  color: pink;
}

.rectangle {
  width: 300px;
  height: 260px;
  background-color: rgb(41, 55, 102);
  border-radius: 25px;
}

.menu {
  width: 800px;
  height: 50px;
  background-color: rgb(41, 55, 102);
  border-radius: 25px;
  font-size: 30px;
}

.image {
  height:100px;
  align-content: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.text-box {
  background-color: pink;
  color: rgb(41, 55, 102)
}

</style>
