<template>
    <div class="info">
        <div class="ticks">
            <span>Ticks:</span>
            <span>{{ticks}}</span>
        </div>
        <div class="race-info" v-for="race in races" :key="race.id">
            <!-- span>{{race}}</span-->
            <div>{{race.type}}</div>
            <span>HW:{{race.props.hardworking}}</span>
            <span>RS:{{race.props.research}}</span>
            <span>DI:{{race.props.diplomacy}}</span>
            <span>AG:{{race.props.agressive}}</span>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        ticks: {
            type: Number,
            default: 0
        },
        races: {
            type: Array|Object
        }
    },
    computed: {
        
    }
}
</script>

<style lang="scss">
.info {
    font-size: 12px;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr;
    .race-info {
        span {
            padding-right: 7px;
        }
    }
}
</style>