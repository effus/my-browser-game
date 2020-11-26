<template>
    <div class="map" :style="gridStyle">
        <template v-for="(_, y) in mapItems">
            <template v-for="(_, x) in rowItems">
                <base-cell 
                    :id="'cell-' + y + '-' + x" 
                    :key="x + '.' + y"
                    :x="x"
                    :y="y"
                    v-on:click="onCellClick"
                ></base-cell>
            </template>
        </template>
    </div>
</template>

<script>

//import {ResourceTypes} from '../game/resource.js';
import BaseCell from './BaseCell.vue';

export default {
    components: {BaseCell},
    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        }
    },
    computed: {
        gridStyle() {
            return 'grid-template-columns: repeat(' + this.width + ', 30px);' + 
            'grid-template-rows: repeat(' + this.height + ', 30px);';
        },
        mapItems() {
            return Array(this.height).fill(0);
        },
        rowItems() {
            return Array(this.width).fill(0);
        }
    },
    methods: {
        onCellClick(cell) {
            this.$emit('select', cell);
        }
    }
}
</script>

<style lang="scss">
.map {
    display: grid;
    grid-gap: 0;
}
</style>