<template>
    <div class="info">
        <div class="game">
            <span>Year: {{year}}</span>
        </div>
        <div v-if="selected">
            {{typeName}}
        </div>
        <div v-if="isResource">
            res
        </div>
        <div class="race" v-if="isRace">
        
            <div class="resources">
                <base-info-resource label="Iron" :value="selected.race.resources.iron" />
                <base-info-resource label="Gold" :value="selected.race.resources.gold" />
                <base-info-resource label="Stone" :value="selected.race.resources.stone" />
                <base-info-resource label="Wood" :value="selected.race.resources.wood" />
                <base-info-resource label="Meal" :value="selected.race.resources.meal" />
                <base-info-resource label="Flour" :value="selected.race.resources.flour" />
                <base-info-resource label="Water" :value="selected.race.resources.water" />
            </div>
            <div class="mutations">
                {{selected.race.mutations}}
            </div>
            <div class="life">
                <base-info-resource label="Population" :value="selected.race.population" />
                <base-info-resource label="Happiness" :value="selected.race.happiness" />
                <base-info-resource label="Mortality" :value="selected.race.mortality" />
                <base-info-resource label="Territory" :value="selected.race.territory" />
            </div>
            <div class="skills">
                <base-info-resource label="Hardworking" :value="selected.race.skills.hardworking" />
                <base-info-resource label="Research" :value="selected.race.skills.research" />
                <base-info-resource label="Diplomacy" :value="selected.race.skills.diplomacy" />
                <base-info-resource label="Agressive" :value="selected.race.skills.agressive" />
            </div>
        </div>
    </div>
</template>

<script>
import {RaceTypes} from '../game/v2/race.js';
import BaseInfoResource from './BaseInfoResource.vue';
export default {
    components: {
        BaseInfoResource
    },
    props: {
        selected: {
            type: Object,
            default: () => {
                return {
                    cell: null,
                    race: null,
                    resource: null
                }
            }
        },
        year: {
            type: Number,
            default: 0
        }
    },
    computed: {
        typeName() {
            let name = '';
            if (this.isRace) {
                name = this.selected.race.name;
            } 
            return name;    
        },
        isResource() {
            return this.selected.cell && this.selected.cell.flagOpen ? this.selected.cell.type > 1 : false;
        },
        isRace() {
            return this.selected.race ? true : false;
        }
    }
}
</script>

<style lang="scss">
.info {
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 1fr 9fr;
    .race {
        display: grid;
        grid-template-columns: 3fr 3fr 3fr 3fr;
        .resources {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(7, 70px);
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 1;
        }
        .mutations {
            width: 100%;
            grid-column-start: 4;
            grid-row-start: 1;
        }
        .life {
            display: grid;
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-template-columns: repeat(4, 170px);
            
        }
        .skills {
            display: grid;
            grid-template-columns: repeat(4, 170px);
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 3;
        }
    }
}
</style>