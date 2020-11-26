'use strict';

import { Resource, ResourceTypes } from "./resource";

class MapCell extends Resource {

    constructor(x, y, type) {
        super();
        this.flagOpen = false;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    get typeName() {
        const types = ResourceTypes().list;
        return this.flagOpen ? types[this.type] : types[0];
    }

    setResources(iron, gold, stone, wood, meal, flour, water) {
        this.iron = iron;
        this.gold = gold;
        this.stone = stone;
        this.wood = wood;
        this.meal = meal;
        this.flour = flour;
        this.water = water;
    }

    setSkills(skills) {
        this.skills = skills;
    }

    setOwnerRace(raceIndex) {
        this.ownerRace = raceIndex;
    }

    setRaceBase(raceIndex) {
        this.baseOfRace = raceIndex;
        this.type = ResourceTypes().keys.race;
        this.open();
        this.setOwnerRace(raceIndex);
    }

    open() {
        this.flagOpen = true;
    }

    neibours() {
        return {
            top: null,
            right: null,
            bottom: null,
            left: null
        }
    }
}

export default MapCell;