<template>
    <div class="info-res">
        <span class="label">{{label}}</span>
        <span class="value">{{value}}</span>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss">
.info-res {
    display: grid;
    grid-template-columns: 2fr 1fr;
}
</style>