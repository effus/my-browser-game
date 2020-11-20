'use strict';

import {Resource} from './resource.js';

const RaceTypes = () => {
    return {
        index: [
            'bear',
            'troll',
            'tiger',
            'mask',
            'spider',
            'rat',
            'monkey',
            'cat',
            'goose',
            'eagle',
            'bee'
        ],
        colors: [
            '#cccccc',
            '#ffffff',
            '#caaaaa'
        ]
    }
}

class RaceSkills {
    constructor() {
        this.research = 1;
        this.agressive = 1;
        this.diplomacy = 1;
        this.hardworking = 1;
    }
};

class Race {

    constructor(type, colorIndex, population, ageLimit) {
        this.type = type;
        this.colorIndex = colorIndex;
        this.mutations = {};
        this.population = population;
        this.ageLimit = ageLimit;
        this.happiness = 1;
        this.mortality = 0.1;
        this.territory = 1;
        this.target = {
            cell: null,
            progress: 0
        };
        this.resources = new Resource();
        this.skills = new RaceSkills();
    }

    get name() {
        return RaceTypes().index[this.type];
    }

    get color() {
        return RaceTypes().colors[this.colorIndex];
    }

    setMutation(resource, value) {
        this.mutations[resource] = value;
    }

    randomizer(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    startNewYear() {
        this.increacePopulation();
        this.calculateHappinness();
        this.calculateMortality();
        
    }

    increacePopulation() {
        const unitsBorns = this.randomizer(Math.ceil(this.population * this.happiness));
        const unitsDies = this.randomizer(Math.ceil(this.population * this.mortality));
        this.population = this.population + unitsBorns - unitsDies;
        if (this.population === 0) {
            this.type = 0;
        }
    }

    calculateHappinness() {
        // < 0.01 = 1 happiness
        // > 0.01 < 1 = x hapipiness
        // > 1 = 0.1 happiness
        if (this.population <= 4) {
            this.happiness = 0;
        }
        this.happiness = this.territory / this.population * 100;
        if (this.happiness > 1) {
            this.happiness = 1;
        } else if (this.happiness < 0.1) {
            this.happiness = 0.1;
        }
    }

    calculateMortality() {
        // 1 cell per 100 units = 0.1 mortality
        // 1 cell per 200 units = 1 mortality
        // 1 cell per 50 units = 0.5 mortality
        // 1 cell per 10000 units = 1 mortality
        if (this.population <= 4) {
            this.mortality = 1;
        }
        this.mortality = this.territory * this.population * 0.01;
        if (this.mortality > 1) {
            this.mortality = 1;
        } else if (this.mortality < 0.1) {
            this.mortality = 0.1;
        }
    }

    setNeibours(grid) {

    }

    checktarget() {
        if (this.target.cell === null) {
            this.findTarget();
        } else {
            this.processTarget();
        }
    }

    findTarget() {

    }

    processTarget() {
        
    }
}

export {Race, RaceSkills, RaceTypes};