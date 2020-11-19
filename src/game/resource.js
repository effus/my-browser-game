'use strict';

const ResourceTypes = () => {
    return {
        list: [
            'shadow', // 0
            'race', // 1
            'grunt', // 2
            'rock', // 3
            'water', // 4
            'forest', // 5
            'field', // 6
            'swamp', // 7
            'sand', // 8
            'snow' // 9
        ],
        keys: {
            shadow: 0,
            race: 1
        }
    }
};


class Resource {
    
    constructor(type) {
        this.type = type;
        this.flagOpen = false;
        this.iron = 0;
        this.gold = 0;
        this.stone = 0;
        this.wood = 0;
        this.meal = 0;
        this.flour = 0;
        this.water = 0;
        this.race = null;
    }

    get typeName() {
        const types = ResourceTypes().list;
        return this.flagOpen ? types[this.type] : types[0];
    }

    setParams(iron, gold, stone, wood, meal, flour, water) {
        this.iron = iron;
        this.gold = gold;
        this.stone = stone;
        this.wood = wood;
        this.meal = meal;
        this.flour = flour;
        this.water = water;
    }

    setRace(raceType) {
        this.type = ResourceTypes().keys.race;
        this.race = raceType;
        this.flagOpen = true;
    }

    open() {
        this.flagOpen = true;
    }
};

export {Resource, ResourceTypes};