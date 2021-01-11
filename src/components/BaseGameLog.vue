<template>
    <div class="gamelog" v-if="isVisible">
        <div v-for="(str,i) in log" :key="i">
            {{str}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        log: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss">
.gamelog {
    overflow: auto;
    width: 100%;
    max-height: 130px;
    box-sizing: border-box;
    background-color: rgb(12, 15, 15);
    padding: 5px;
    div {
      font-size: 12px;
      color: yellow;
    }
}
.gamelogcollapsed {
    display: none;
    width: 100%;
    
    height: 26px;
    justify-content: flex-end;
    
}
</style>