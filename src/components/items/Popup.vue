<template>
    <div class="popup">
        <div class="popup-inner">
            <slot/>
            <button class ="button-class" @click="changePopup()">
                OK
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: ['changePopup']
}

</script>

<style>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background-color: rgba(255, 175, 188, 0.301);
        display: flex;
        align-items: center;
        justify-content: center;

        .popup-inner {
            background: rgb(41, 55, 102);
            padding: 32px;
            border-radius: 30px;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            color: pink;
        }
    }


</style>