<template>
    <div class="map" :style="gridStyle">
        <template v-for="(row, y) in map">
            <template v-for="(resource, x) in row">
                <base-cell 
                    :id="'cell-' + y + '-' + x" 
                    :key="x + '.' + y"
                    :type="resource.flagOpen ? resource.type : 0"
                    :race="resource.race ? resource.race.type : null"
                    :x="x"
                    :y="y"
                    v-on:click="onCellClick"
                ></base-cell>
            </template>
        </template>
    </div>
</template>

<script>

import {ResourceTypes} from '../game/resource.js';
import BaseCell from './BaseCell.vue';

export default {
    components: {BaseCell},
    props: {
        map: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        gridStyle() {
            return 'grid-template-columns: repeat(' + this.map[0].length + ', 30px);' + 
            'grid-template-rows: repeat(' +this.map.length+ ', 30px);';
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