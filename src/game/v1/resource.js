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
        },
        points: {
            grunt: {
                r: {flour: 0.5, meal: 0.1, water: 0.1},
                s: {hardworking: 1, research: 0.2}
            },
            rock: {
                r: {iron: 0.2, gold: 0.2, stone: 0.6},
                s: {hardworking: 1, research: 0.2}
            },
            water: {
                r: {water: 1, meal: 0.3},
                s: {hardworking: 0.2, research: 0.6, diplomacy: 0.2}
            },
            forest: {
                r: {flour: 0.3, meal: 0.8, water: 0.2, wood: 1},
                s: {hardworking: 0.3, research: 0.8, agressive: 0.3}
            },
            field: {
                r: {flour: 1, meal: 0.5, water: 0.2, wood: 0.1},
                s: {hardworking: 0.3, research: 0.7, diplomacy: 0.3}
            },
            swamp: {
                r: {meal: 0.3, water: 0.8, wood: 0.1, gold: 0.2},
                s: {hardworking: 0.3, research: 0.3, agressive: 0.4}
            },
            sand: {
                r: {gold: 0.1, iron: 0.2, stone: 0.2},
                s: {hardworking: 0.6, research: 0.4, agressive: 0.4}
            },
            snow: {
                r: {meal: 0.1, water: 0.7},
                s: {hardworking: 0.3, research: 0.5, diplomacy: 0.2, agressive: 0.2}
            }
        }
    }
};


class Resource {
    
    constructor(type) {
        //this.type = type;
        //this.flagOpen = false;
        this.iron = 0;
        this.gold = 0;
        this.stone = 0;
        this.wood = 0;
        this.meal = 0;
        this.flour = 0;
        this.water = 0;

        // this.research = 0;
        // this.hardworking = 0;
        // this.diplomacy = 0;
        // this.agressive = 0;
        
        // this.race = null;
        // this.owner = null;
    }

    // get typeName() {
    //     const types = ResourceTypes().list;
    //     return this.flagOpen ? types[this.type] : types[0];
    // }

    setParams(iron, gold, stone, wood, meal, flour, water) {
        this.iron = iron;
        this.gold = gold;
        this.stone = stone;
        this.wood = wood;
        this.meal = meal;
        this.flour = flour;
        this.water = water;
    }

    /*setSkills(research, hardworking, diplomacy, agressive) {
        this.research = research;
        this.hardworking = hardworking;
        this.diplomacy = diplomacy;
        this.agressive = agressive;
    }*/

    /*setRace(raceType, index) {
        this.type = ResourceTypes().keys.race;
        this.race = {
            type: raceType,
            index: index
        };
        this.flagOpen = true;
    }*/

    /*open() {
        this.flagOpen = true;
    }*/

};

export {Resource, ResourceTypes};