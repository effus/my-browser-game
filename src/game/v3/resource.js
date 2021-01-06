'use strict';

const ResourceTypeNames = {
    FIELD: 'field', // поле, луг
    FOREST: 'forest',
    GRUNT: 'grunt', // земля
    ROCK: 'rock',
    SWAMP: 'swamp', // болото
    SAND: 'sand',
    SNOW: 'snow',
    WATER: 'water',
};

class ScoreItem {
    constructor(scores) {
        this.flour = scores.flour ? scores.flour : 0; // мука
        this.meal = scores.meal ? scores.meal : 0; // еда
        this.water = scores.water ? scores.water : 0;
        this.iron = scores.iron ? scores.iron : 0;
        this.gold = scores.gold ? scores.gold : 0;
        this.stone = scores.stone ? scores.stone : 0;
        this.hardworking = scores.hardworking ? scores.hardworking : 0;
        this.research = scores.research ? scores.research : 0;
        this.diplomacy = scores.diplomacy ? scores.diplomacy : 0;
        this.agressive = scores.agressive ? scores.agressive : 0;
    }
};

class TypeScores {
    constructor() {
        this.scores = {};
        this.scores[ResourceTypeNames.FIELD] = new ScoreItem({
            flour: 1, meal: 0.5, water: 0.2, wood: 0.1, hardworking: 0.3, research: 0.7, diplomacy: 0.3
        });
        this.scores[ResourceTypeNames.FOREST] = new ScoreItem({
            flour: 0.3, meal: 0.8, water: 0.2, wood: 1, hardworking: 0.3, research: 0.8, agressive: 0.3
        });
        this.scores[ResourceTypeNames.GRUNT] = new ScoreItem({
            flour: 0.5, meal: 0.1, water: 0.1, hardworking: 1, research: 0.2
        });
        this.scores[ResourceTypeNames.ROCK] = new ScoreItem({
            iron: 0.2, gold: 0.2, stone: 0.6, hardworking: 1, research: 0.2
        });
        this.scores[ResourceTypeNames.SAND] = new ScoreItem({
            gold: 0.1, iron: 0.2, stone: 0.2, hardworking: 0.6, research: 0.4, agressive: 0.4
        });
        this.scores[ResourceTypeNames.SNOW] = new ScoreItem({
            meal: 0.1, water: 0.7, hardworking: 0.3, research: 0.5, diplomacy: 0.2, agressive: 0.2
        });
        this.scores[ResourceTypeNames.SWAMP] = new ScoreItem({
            meal: 0.3, water: 0.8, wood: 0.1, gold: 0.2, hardworking: 0.3, research: 0.3, agressive: 0.4
        });
        this.scores[ResourceTypeNames.WATER] = new ScoreItem({
            meal: 0.3, water: 1, hardworking: 0.2, research: 0.6, diplomacy: 0.2
        });
    }
    get(type) {
        return this.scores[type];
    }
}

const getRandomType = () => {
    const types = Object.keys(ResourceTypeNames);
    const rand = Math.floor(Math.random() * Math.floor(types.length));
    return types[rand];
};

export {ResourceTypeNames, TypeScores, getRandomType};