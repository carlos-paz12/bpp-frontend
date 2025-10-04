<template>
    <main>
        <Header/>
        <h1>Vue Popups</h1>
        <button @click="() => changePopup('buttonTrigger')" class="button-class">Open popup</button>
            <Popup
            v-if="triggers.buttonTrigger"
            :changePopup="() => changePopup('buttonTrigger')">
                <h2>Ponto registrado com sucesso!</h2>
            </Popup>
    </main>
</template>

<script>
import Popup from './Popup.vue';
import Header from './Header.vue';
import { ref } from 'vue';

export default {
    components: {
        Header, Popup
    },
    setup() {

        const triggers = ref({
            buttonTrigger: false
        });

        const changePopup = (trigger) => {
            triggers.value[trigger] = !triggers.value[trigger]
        }

        return {
            Popup,
            triggers,
            changePopup
        }
    }
}

</script>

<style>

</style>