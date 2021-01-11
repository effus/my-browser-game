<template>
    <div class="cell" :class="styles" @click="onClick">
        <span class="progress" :class="progressOwner" :style="getProgressStyle"></span>
    </div>
</template>

<script>
import CellEngine from '../game/v3/cell-engine';
import {mixin as VueTimers} from 'vue-timers';
import Bus from '../game/bus.js';
import { CellProceedResults } from '../game/v3/resource';

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
        },
        ticks: {
            type: Number
        }
    },
    data() {
        return {
            cellEngine: null,
            styles: '',
            progressOwner: '',
            cellProgress: 0,
            isProcessing: false
        }
    },
    mounted() {
        this.cellEngine = new CellEngine({x: this.x, y: this.y});
        window.Bus.$on('set-race-base-cell', (p) => this.onSetRaceBaseCell(p));
        window.Bus.$on('who-is-next', (p) => this.onWhoIsNext(p));
        window.Bus.$on('cell-process', (p) => this.onCellProcess(p));
        window.Bus.$on('get-resources', (p) => this.onGetResources(p));
        this.updateStyles();
    },
    methods: {
        updateStyles() {
            this.styles = this.cellEngine.getStyles();
        },

        /**
         * Occupying this cell by race
         */
        onSetRaceBaseCell(payload) {
            try {
                if (this.cellEngine.checkCoords(payload.coords)) {
                    this.cellEngine.changeToRace(payload.raceId, payload.raceType, payload.color);
                }
                this.updateStyles();
            } catch (e) {
                console.error('onSetRaceBaseCell', e);
                window.Bus.$emit('global-error', {e});
            }
        },

        /**
         * get 'who-is-next' request and send answer if needed
         */
        onWhoIsNext(payload) {
            if (this.cellEngine.checkAmINext(payload.raceId) === true && this.isProcessing === false) {
                window.Bus.$emit('i-am-next', {
                    from: this.cellEngine.getSelfInfo(),
                    to: payload.raceId
                });
            }
        },

        /**
         * get 'cell-process' request and try to proceed
         */
        onCellProcess(payload) {
            if (this.cellEngine.checkCoords(payload.coords) && this.isProcessing === false) {
                this.isProcessing = true;
                try {
                    const proceedResult = this.cellEngine.tryProceed(payload.raceId, payload.process, payload.increment);
                    if (proceedResult === true) { // process completed
                        this.cellProgress = 0;
                        const procResult = this.cellEngine.onProceedComplete(payload.process, payload.raceId, payload.raceColor);
                        this.updateStyles();
                        window.Bus.$emit('cell-proceed', {
                            from: this.cellEngine.getSelfInfo(),
                            to: payload.raceId,
                            process: payload.process,
                            result: procResult
                        });
                        if (procResult.result === CellProceedResults.CELL_CONNECTED || procResult.result === CellProceedResults.CELL_DESTROYED) {
                            window.Bus.$emit('decrease-cell-count', {
                                from: this.cellEngine.getSelfInfo(),
                                to: procResult.oldOwner
                            });
                        } 
                        if (procResult.result === CellProceedResults.FABRIC_BUILDED || procResult.result === CellProceedResults.CELL_CONNECTED) {
                            window.Bus.$emit('increase-cell-count', {
                                from: this.cellEngine.getSelfInfo(),
                                to: procResult.newOwner
                            });
                        }
                        
                    } else if (proceedResult === false) { // process declined
                        window.Bus.$emit('cell-process-decline', {
                            from: this.cellEngine.getSelfInfo(),
                            to: payload.raceId,
                            process: payload.process
                        });
                    } else {
                        //console.log('onCellProcess', payload.process);
                        this.progressOwner = payload.raceColor;
                    }
                    this.cellProgress = this.cellEngine.progress;

                } catch (e) {
                    console.error('onCellProcess.Exception', e, payload);
                    window.Bus.$emit('global-error', {e});
                }
                this.isProcessing = false;
            }
        },
        onGetResources(payload) {
            const resources = this.cellEngine.getResourceForTick(payload.raceId, payload.tick, this.ticks);
            if (resources) {
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
            return 'top: ' + (this.size - this.cellProgress * 0.01 * this.size) + 'px';
        }
    }
}
</script>

<style lang="scss">
@import '../game/v3/colors.scss';
.cell {
    font-size: 12px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-right: 1px solid #232222;
    border-bottom: 1px solid #111;
    background-color: #333333;
    &.yellow {
        background-color: $yellow;
    }
    &.white {
        background-color: $white;
    }
    &.red {
        background-color: $red;
    }
    &.blue {
        background-color: $blue;
    }
    &.brown {
        background-color: $brown;
    }
    &.purple {
        background-color: $purple;
    }
    &.orange {
        background-color: $orange;
    }
    &.dark-green {
        background-color: $dark-green;
    }
    &.light-green {
        background-color: $light-green;
    }
    &.pink {
        background-color: $pink;
    }
}
.shadow {
    background-color: #000;
}
.woods {
    background-image: url('../assets/icons/log.svg');
    ///background-color: rgb(185, 182, 0);
}
.field {
    background-image: url('../assets/icons/wheat.svg');
    //background-color: rgb(217, 235, 116);
}
.rock {
    background-image: url('../assets/icons/gold-mine.svg');
    //background-color: rgb(197, 197, 197);
}
.forest {
    background-image: url('../assets/icons/fruit-tree.svg');
    //background-color: rgb(0, 167, 64);
}
.swamp {
    background-image: url('../assets/icons/grass.svg');
    //background-color: rgb(116, 235, 162);
}
.grunt {
    background-image: url('../assets/icons/plow.svg');
    //background-color: rgb(235, 174, 116);
}
.sand {
    background-image: url('../assets/icons/worms.svg');
    //background-color: rgb(255, 238, 182);
}
.water {
    background-image: url('../assets/icons/dolphin.svg');
    //background-color: rgb(0, 174, 255);
}
.race {
    border: 1px solid gold;
    box-sizing: border-box;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
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
    &.yellow {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $yellow);
    }
    &.white {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $white);
    }
    &.red {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $red);
    }
    &.blue {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $blue);
    }
    &.brown {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $brown);
    }
    &.purple {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $purple);
    }
    &.orange {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $orange);
    }
    &.dark-green {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $dark-green);
    }
    &.light-green {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $light-green);
    }
    &.pink {
        background: linear-gradient(to top, rgba(255, 255, 255, 0), $pink);
    }

}

</style>