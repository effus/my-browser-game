<template>
    <div class="cell" :class="getClass" @click="onClick">
        <span class="progress"></span>
    </div>
    
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import Bus from '../game/bus.js';
import { Race, RaceTypes } from '../game/v2/race.js';
//import {RaceTypes} from '../game/race.js';
import { ResourceTypes } from '../game/v2/resource.js';
//import MapCell from '../game/v2/mapCell.js';
export default {
    mixins: [VueTimers],
    props: {
        x: {
            type: Number
        },
        y: {
            type: Number
        }
    },
    data() {
        return {
            race: null,
            resource: null,
            isOpen: false,
            progress: 0
        }
    },
    computed: {
        getClass() {
            let r = [];
            if (!this.isOpen) {
                r.push('shadow');
            }
            if (this.race) {
                r.push('race');
                r.push(RaceTypes().index[this.race.type]);
            }
            return r;
        },
        getProgressStyle() {
            // 100 == 30px
            // 2 == 2*30/100
            return 'top: ' + (30 - this.progress * 0.01 * 30) + 'px';
        }
    },
    mounted() {
        Bus.$on('create-race', this.onCreateRace);
        Bus.$on('find-neibour', this.onSearchNeibour);
        Bus.$on('i-am-neibour', this.onNeibourResponse);
    },
    timers: {
        update: { time: 5000, autostart: false, repeat: true }
    },
    methods: {
        onClick() {
            Bus.$emit('show-info', {
                race: this.race,
                cell: {x: this.x, y: this.y}
            });
        },
        onCreateRace(payload) {
            if (this.x === payload.coordinates.x && this.y === payload.coordinates.y) {
                this.race = new Race(
                    payload.raceType,
                    payload.colorIndex,
                    payload.initialPopulation,
                    100
                );
                this.isOpen = true;
                this.$timer.start('update');
                this.race.setOwnMapPoint(this.x, this.y, 'base');
            }
        },
        onGameStart() {
            console.log('game started');
        },
        update() {
            this.race.update();
            const checkCoords = this.race.getCoordinatesToCheck();
            /*Bus.$emit('find-neibor', {
                x: this.x,
                y: this.y
            });*/
        },
        onSearchNeibour(payload) {

        },
        onNeibourResponse(payload) {

        }
    }
}
</script>

<style lang="scss">
.cell {
    font-size: 12px;
    position: relative;
    overflow: hidden;
}
.shadow {
    background-color: #000;
}
.woods {
    background-image: url('../assets/icons/log.svg');
    background-color: rgb(185, 182, 0);
}
.field {
    background-image: url('../assets/icons/wheat.svg');
    background-color: rgb(217, 235, 116);
}
.rock {
    background-image: url('../assets/icons/gold-mine.svg');
    background-color: rgb(197, 197, 197);
}
.forest {
    background-image: url('../assets/icons/fruit-tree.svg');
    background-color: rgb(0, 167, 64);
}
.swamp {
    background-image: url('../assets/icons/grass.svg');
    background-color: rgb(116, 235, 162);
}
.grunt {
    background-image: url('../assets/icons/plow.svg');
    background-color: rgb(235, 174, 116);
}
.sand {
    background-image: url('../assets/icons/worms.svg');
    background-color: rgb(255, 238, 182);
}
.water {
    background-image: url('../assets/icons/dolphin.svg');
    background-color: rgb(0, 174, 255);
}
.race {
    &.mask {
        background-image: url('../assets/icons/tribal-mask.svg');
    }
    &.bear {
        background-image: url('../assets/icons/bear-face.svg');
    }
    &.troll {
        background-image: url('../assets/icons/troll.svg');
    }
    &.tiger {
        background-image: url('../assets/icons/tiger-head.svg');
    }
    &.spider {
        background-image: url('../assets/icons/spider-alt.svg');
    }
    &.rat {
        background-image: url('../assets/icons/rat.svg');
    }
    &.monkey {
        background-image: url('../assets/icons/monkey.svg');
    }
    &.cat {
        background-image: url('../assets/icons/cat.svg');
    }
    &.goose {
        background-image: url('../assets/icons/goose.svg');
    }
    &.eagle {
        background-image: url('../assets/icons/eagle-head.svg');
    }
    &.bee {
        background-image: url('../assets/icons/bee.svg');
    }
}
.progress {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    top: 30px;
    left: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), #00c029);
}

</style>