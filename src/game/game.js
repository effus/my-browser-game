'use strict';

import {Resource, ResourceTypes} from './resource.js';
import {Race, RaceTypes} from './race.js';
import {Map} from './map.js';
import {Helper} from './helper.js';

class Game {

    constructor(options) {
        this.options = options;
        this.races = [];
        this.year = 0;
        this.flagGenerating = true;
        this.map = new Map(this.options.mapSizeWidth, this.options.mapSizeHeight);
        this.new();
        this.flagGenerating = false;
    }

    new() {
        for (let i=0; i < this.options.racesCount; i++) {
            this.addRace(i, this.options.racesCount);
        }
    }

    get isGenerating() {
        return this.flagGenerating;
    }

    addRace(i, n) {
        const raceType = Helper.randomizer(RaceTypes().index.length - 1);
        const raceColor = Helper.randomizer(RaceTypes().colors.length - 1);
        this.map.setRaceBase(i, n, raceType);
        this.races.push(new Race(
                raceType, 
                raceColor,
                this.options.population, 
                this.options.ageLimit
            )
        );
    }

    newYear() {
        this.year++;

        //@todo calculate statistic

        /*for (let i in this.races) {
            this.races[i].startNewYear();
            this.map.fillNeibours();
            this.races[i].setNeibours(this.map.grid);
            this.races[i].checkTarget();
        }*/

    }

}

export default Game;
