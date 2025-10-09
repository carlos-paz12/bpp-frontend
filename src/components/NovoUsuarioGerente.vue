<template>

    <Header/>

    <div class="center-container">
        <div class="rectangle">
            <h1 class="secondary">Cadastro de gerente</h1>
            <input class="text-box" v-model="username" placeholder="Usuário" />
            <br/><br/>
            <input class="text-box" v-model="password" type="password" placeholder="Senha" />
            <br/><br/>
            <button class="button-class">Cadastrar</button>
            <p v-if="error" style="color:pink; font-style: italic, bold;">{{ error }}</p>
        </div>
    </div>

    <div class="image-container">
    <img class="image" src = "@/assets/img/strawberryicon.png"/>
    </div>

</template>

<script>
import Header from './items/Header.vue';
import ContentBlock from './items/ContentBlock.vue';

export default {
    components: {
        Header, ContentBlock
    }
}

</script>
