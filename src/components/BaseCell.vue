<template>
    <span :class="getClass" @click="onClick"></span>
</template>

<script>
import {RaceTypes} from '../game/race.js';
import { ResourceTypes } from '../game/resource.js';
export default {
    props: {
        type: {
            type: Number,
            default: null
        },
        race: {
            type: Number|Object,
            default: null
        },        
        x: {
            type: Number
        },
        y: {
            type: Number
        }
    },
    computed: {
        getClass() {
            let r = [];
            r.push(ResourceTypes().list[this.type]);
            if (this.race !== null) {
                r.push(RaceTypes().index[this.race]);
            }
            return r;
        }
    },
    methods: {
        onClick() {
            this.$emit('click', {
                x: this.x,
                y: this.y,
                type: this.type,
                race: this.race

            });
        }
    }
}
</script>

<style lang="scss">
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
</style>