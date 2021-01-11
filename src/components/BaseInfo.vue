<template>
    <div class="info">
        <div class="ticks">
            <span>Ticks:</span>
            <span class="text-white">{{ticks}}</span>
        </div>
        <div class="race-info" v-for="race in races" :key="race.id.i">
            <div class="race-type">
                {{race.type}}
                <span v-if="race.process">({{race.process}})</span>
            </div>
            <div class="skills-row">
                <span>HardWork:</span> 
                <progress :value="race.props.hardworking" max="100"></progress>
            </div>
            <div class="skills-row">
                <span>Research:</span> 
                <progress :value="race.props.research" max="100"></progress>
            </div>
            <div class="skills-row">
                <span>Diplomacy:</span> 
                <progress :value="race.props.diplomacy" max="100"></progress>
            </div>
            <div class="skills-row">
                <span>Agressive:</span> 
                <progress :value="race.props.agressive" max="100"></progress>
            </div>
            <div class="resources">
                <span class="res-item">
                    Food: <span>{{race.resources.food | round}}</span>
                </span>
                <span class="res-item">
                    Water: <span>{{race.resources.water | round}}</span>
                </span>
                <span class="res-item">
                    Metals: <span>{{race.resources.metals | round}}</span>
                </span>
                <span class="res-item">
                    Stones: <span>{{race.resources.stones | round}}</span>
                </span>
            </div>
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
        
    },
    filters: {
        round: function (value) {
            if (!value)  {
                return 0;
            }
            return (Math.round(value * 100) / 100).toFixed(2);
        }
    }
}
</script>

<style lang="scss">
.info {
    font-size: 12px;
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 2fr 2fr 2fr;
    color: #53779b;
    background-color: rgb(24, 24, 14);
    grid-gap: 5px;
    box-sizing: border-box;
    padding: 5px;
    .text-white {
        color: #fff;
    }
    .race-info {
        .race-type {
            color: #fff;
            margin-bottom: 4px;
        }
        .resources {
            margin-top: 5px;
            display: grid;
            grid-gap: 1px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            .res-item {
                padding-right: 7px;
                padding: 3px;
                border: 1px solid #293c50;
                border-radius: 3px;
                margin-right: 4px;
                display: flex;
                justify-content: space-between;
                span {
                    color: #fff;
                }
            }
        }
        .skills-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            span {
                width: 60px;
            }
            progress {
                flex-grow: 2;
            }
        }
    }
}
</style>