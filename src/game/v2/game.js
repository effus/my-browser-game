'use strict';

//import {Resource, ResourceTypes} from './resource.js';
import {Race, RaceTypes} from './race.js';
//import {Map} from './map.js';
import {Helper} from './helper.js';
import Bus from '../bus.js';

class Game {

    constructor(options) {
        this.options = options;
        this.year = 0;
    }

    newYear() {
        this.year++;
        if (this.year === 1) {
            this.createRaces();
        } else {
            Bus.$emit('race-get-stat');
        }
    }

    createRaces() {
        for (let i=0; i < this.racesCount; i++) {
            const raceType = Helper.randomizer(RaceTypes().index.length - 1);
            const raceColor = Helper.randomizer(RaceTypes().colors.length - 1);
            const coordinates = this.getBaseCoordinates(i, this.racesCount);
            Bus.$emit('create-race', {
                raceType: raceType,
                colorIndex: raceColor,
                coordinates,
                initialPopulation: this.options.initialPopulationSize,
            });
        }
    }

    get mapSize() {
        return {
            width: this.options.mapSizeWidth,
            height: this.options.mapSizeHeight
        }
    }

    get racesCount() {
        return this.options.racesCount;
    }

    get initialPopulationSize() {
        return this.options.initialPopulationSize;
    }

    get ageLimit() { // ???
        return this.ageLimit;
    }

    getBaseCoordinates(raceIndex, raceCount) {
        const partSize = Math.ceil((this.mapSize.width * this.mapSize.height) / raceCount);
        let x = Math.ceil((partSize * raceIndex + Helper.randomizer(partSize)) / this.mapSize.width);
        let y = Math.ceil((partSize * raceIndex + Helper.randomizer(partSize)) / this.mapSize.height);
        if (x >= this.mapSize.width) {
            x = this.mapSize.width - 1;
        }
        if (y >= this.mapSize.height) {
            y = this.mapSize.height - 1;
        }
        return {
            x,
            y
        }
    }

}

export default Game;
