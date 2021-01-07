<template>
    <div class="cell" :class="styles" @click="onClick">
        <span class="progress"></span>
    </div>
</template>

<script>
import CellEngine from '../game/v3/cell-engine';
import {mixin as VueTimers} from 'vue-timers';
import Bus from '../game/bus.js';

if (typeof window.Bus === 'undefined') {
    window.Bus = Bus;
}

export default {
    mixins: [VueTimers],
    props: {
        x: {
            type: Number
        },
        y: {
            type: Number
        },
        size: {
            type: Number,
            default: 30
        }
    },
    data() {
        return {
            cellEngine: null,
            styles: ''
        }
    },
    mounted() {
        this.cellEngine = new CellEngine({x: this.x, y: this.y});
        window.Bus.$on('set-race-base-cell', (p) => this.onSetRaceBaseCell(p));
        window.Bus.$on('who-is-next', (p) => this.onWhoIsNext(p));
        window.Bus.$on('cell-process', (p) => this.onCellProcess(p));
        //window.Bus.$on('get-resources', (p) => this.onGetResources(p));
        this.updateStyles();
    },
    timers: {
        //update: { time: 5000, autostart: false, repeat: true }
    },
    methods: {
        updateStyles() {
            this.styles = this.cellEngine.getStyles();
        },
        onSetRaceBaseCell(payload) {
            if (this.cellEngine.checkCoords(payload.coords)) {
                console.log('onSetRaceBaseCell', payload);
                this.cellEngine.changeToRace(payload.raceId, payload.raceType, payload.color);
            }
            this.updateStyles();
        },
        onWhoIsNext(payload) {
            if (this.cellEngine.checkAmINext(payload.raceId) === true) {
                window.Bus.$emit('i-am-next', {
                    from: this.cellEngine.getSelfInfo(),
                    to: payload.raceId
                });
            }
        },
        onCellProcess(payload) {
            if (this.cellEngine.checkCoords(payload.coords)) {
                try {
                    const proceedResult = this.cellEngine.tryProceed(payload.raceId, payload.process, payload.increment);
                    if (proceedResult === true) { // process completed
                        window.Bus.$emit('cell-proceed', {
                            from: this.cellEngine.getSelfInfo(),
                            to: payload.raceId,
                            process: payload.process
                        });
                    } else if (proceedResult === false) { // process declined
                        window.Bus.$emit('cell-process-decline', {
                            from: this.cellEngine.getSelfInfo(),
                            to: payload.raceId,
                            process: payload.process
                        });
                    }
                } catch (e) {
                    window.Bus.$emit('global-error', {e});
                }
            }
        },
        onGetResources(payload) {
            const resources = this.cellEngine.getResourceForTick();
            if (resource !== null) {
                window.Bus.$emit('resources-pack', {
                    from: this.cellEngine.getSelfInfo(),
                    to: this.cellEngine.owner,
                    resources: resources
                });
            }
        },
        onClick() {
            /*Bus.$emit('show-info', {
                race: this.race,
                cell: {x: this.x, y: this.y}
            });*/
        },
        
    },
    
    computed: {
        getProgressStyle() {
            //return 'top: ' + (this.size - this.progress * 0.01 * this.size) + 'px';
        }
    }
}
</script>

<style lang="scss">
.cell {
    font-size: 12px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-right: 1px solid #232222;
    border-bottom: 1px solid #111;
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
    &.white {
        background-color: #fff;
    }
    &.grey {
        background-color: #ccc;
    }
    &.red {
        background-color: #ffa3a3;
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