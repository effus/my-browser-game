'use strict';

import {Resource, ResourceTypes} from './resource.js';
import {Race, RaceTypes} from './race.js';

class Game {

    constructor(options) {
        this.options = options;
        this.generate();
    }

    generate() {
        this.flagGenerating = true;
        this.grid = Array(this.options.mapSizeHeight).fill(0).map(() => {
            return Array(this.options.mapSizeWidth).fill(0).map(() => {
                return new Resource(this.randomizer(ResourceTypes().list.length - 3) + 2);
            });
        });
        for (let i=0; i < this.options.racesCount; i++) {
            this.addRace(i, this.options.racesCount);
        }
        this.flagGenerating = false;
    }

    randomizer(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    get isGenerating() {
        return this.flagGenerating;
    }

    get map() {
        return this.grid;
    }

    get mapSize() {
        return {
            width: this.grid[0].length,
            height: this.grid.length
        }
    }

    addRace(i, n) {
        const partSize = Math.ceil((this.mapSize.width * this.mapSize.height) / n);
        let x = Math.ceil((partSize * i + this.randomizer(partSize)) / this.mapSize.width);
        let y = Math.ceil((partSize * i + this.randomizer(partSize)) / this.mapSize.height);
        if (x >= this.mapSize.width) {
            x = this.mapSize.width - 1;
        }
        if (y >= this.mapSize.height) {
            y = this.mapSize.height - 1;
        }
        this.grid[x][y].setRace(this.randomizer(RaceTypes().index.length - 1));
    }
}

export default Game;
