<template>
    <div class="info" v-if="selected">
        <span>:</span>
        <span v-if="selected.type === 1">Race</span>
        <span v-if="selected.type === 0">Shadow</span>
        <span>{{selected}}</span>
    </div>
</template>

<script>
export default {
    props: {
        selected: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss">
.info {
    height: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr fr;
}
</style>