<template>
  <Header />

  <div class="center-container">
    <div class="cadastro-rectangle">
        <br />
      <h1 class="secondary">Cadastro de novo usuário</h1>
      <br />
      <input class="text-box" v-model="username" placeholder="Username" />
      <br /><br />
      <input class="text-box" v-model="name" placeholder="Nome" />
      <br /><br />
      <input class="text-box" v-model="email" type="email" placeholder="Email" />
      <br /><br />
      <input class="text-box" v-model="password" type="password" placeholder="Senha" />
      <br /><br />
      <select class=text-box v-model="tipo" placeholder="Tipo de usuário">
         <!--<option disabled value="">selecione o tipo de usuario</option>-->
         <option value="BOLSISTA">Bolsista</option>
         <option value="ADMIN">Administrador</option>
      </select>
      <br /><br />
      <button class="button-class" @click="handleCadastro">Cadastrar</button>
      <p v-if="error" style="color:pink; font-style: italic; font-weight: bold;">{{ error }}</p>
    </div>
  </div>

  <div class="image-container">
    <img class="image" src="@/assets/img/strawberryicon.png" />
  </div>
</template>

<script setup>
/* 
 * Com <script setup>, todas as importações de componentes (.vue)
 * ficam automaticamente disponíveis no template,
 * sem precisar declará-las manualmente em `components: { ... }`
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cadastrarBolsista } from '@/services/bolsista_service';
import { cadastrarAdmin } from '@/services/admin_service';
import Header from '@/components/items/Header.vue'

const username = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const tipo = ref("BOLSISTA") // deixa bolsista ser o default value
const error = ref('')
const router = useRouter()

async function handleCadastro() {
  try {
    if (tipo.value == 'ADMIN') {
        await cadastrarAdmin({
          username: username.value,
          name: name.value,
          email: email.value,
          password: password.value,
          router,
        })
        error.value = ''
        alert('Admin cadastrado com sucesso!')
    }
    else {
        await cadastrarBolsista({
          username: username.value,
          name: name.value,
          email: email.value,
          password: password.value,
          router,
        })
        error.value = ''
        alert('Bolsista cadastrado com sucesso!')
    }
  } catch (err) {
    console.error(err)
    error.value = err.response?.data || err.message || 'Erro ao cadastrar bolsista'
  }
}
</script>
