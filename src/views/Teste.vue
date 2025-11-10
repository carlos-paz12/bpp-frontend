<!-- <template>
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
    <DashboardBox>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sequi ratione esse illo sapiente saepe inventore minima repudiandae consequuntur hic beatae soluta, nisi ipsam? Esse, nostrum numquam! Minus, eligendi voluptatum? </p>
    </DashboardBox>
</template>

<script>
import Popup from './items/Popup.vue';
import Header from './items/Header.vue';
import { ref } from 'vue';
import DashboardBox from './items/ContentBlock.vue';

export default {
    components: {
        Header, Popup, DashboardBox
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

</style> -->
