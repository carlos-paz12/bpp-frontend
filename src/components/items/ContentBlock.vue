<template>
    <div class="contentbox">
        <div class="contentblock">
            <slot/>
        </div>
        
    </div>
</template>

<script>

export default {
}

</script>

<style>
    .contentbox{

        display:flex;
        align-items: center;
        justify-content: center;
        
    }

    .contentblock {
        background-color: rgb(41, 55, 102);
        border-radius: 25px;
        padding: 30px;
        max-height: 800px;
        min-height: 300px;
        width: 800px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        color: pink;
    }


</style>