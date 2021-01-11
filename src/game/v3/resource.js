'use strict';

import {Helper} from '../helper';

/**
 * виды ресурсов
 */
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

/**
 * класс для очков ресурсов
 */
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

/**
 * библиотека правил получения очков за владение ячейкой-ресурсом
 */
class ScoresIndex {
    constructor() {
        this.scores = {};
        this.scores[ResourceTypeNames.FIELD] = new ScoreItem({
            flour: 0.5, meal: 0.5, water: 0.1, wood: 0.1, diplomacy: 0.1
        });
        this.scores[ResourceTypeNames.FOREST] = new ScoreItem({
            flour: 0.1, meal: 0.2, water: 0.1, wood: 0.5, hardworking: 0.1, research: 0.2, agressive: 0.1
        });
        this.scores[ResourceTypeNames.GRUNT] = new ScoreItem({
            flour: 0.2, meal: 0.1, water: 0.1, hardworking: 0.2, research: 0.1
        });
        this.scores[ResourceTypeNames.ROCK] = new ScoreItem({
            iron: 0.1, gold: 0.1, stone: 0.2, hardworking: 0.2, research: 0.1
        });
        this.scores[ResourceTypeNames.SAND] = new ScoreItem({
            gold: 0.1, iron: 0.1, stone: 0.1, hardworking: 0.2, research: 0.2, agressive: 0.2
        });
        this.scores[ResourceTypeNames.SNOW] = new ScoreItem({
            meal: 0.1, water: 0.2, hardworking: 0.1, research: 0.2, diplomacy: 0.1, agressive: 0.1
        });
        this.scores[ResourceTypeNames.SWAMP] = new ScoreItem({
            meal: 0.1, water: 0.2, wood: 0.1, gold: 0.1, hardworking: 0.1, research: 0.2, agressive: 0.1
        });
        this.scores[ResourceTypeNames.WATER] = new ScoreItem({
            meal: 0.1, water: 0.5, hardworking: 0.2, research: 0.1, diplomacy: 0.1
        });
    }
    get(type) {
        return this.scores[type];
    }
}
const scoresIndex = new ScoresIndex();

const getRandomType = () => {
    const typeKeys = Object.keys(ResourceTypeNames);
    const rand = Helper.randomizer(typeKeys.length);
    return ResourceTypeNames[typeKeys[rand]];
};

/**
 * используется на карте, соответствует ячейке-ресурсу
 */
class CellResourceItem {
    constructor(resourceType) {
        this.type = resourceType;
        if (typeof resourceType === 'undefined') {
            this.type = getRandomType();
        }
        this.score = scoresIndex.get(this.type);
    }
    getStyle() {
        return this.type;
    }
};


/**
 * типы ячеек
 */
const CellTypes = {
    SHADOW: 'shadow',
    RACE: 'race',
    RESOURCE: 'resource'
};


/**
 * Виды процессов, которые может выполнять раса
 */
const RaceProcesses = {
    RESEARCH_CELL: 'research_cell',
    BUILD_FABRIC: 'build_fabric',
    CONNECT_CELL: 'connect_cell',
    ATTACK_ENEMY: 'attack_enemy'
};

let RaceProcessLabels = {};
RaceProcessLabels[RaceProcesses.RESEARCH_CELL] = 'Research new cell';
RaceProcessLabels[RaceProcesses.BUILD_FABRIC] = 'Build fabric';
RaceProcessLabels[RaceProcesses.CONNECT_CELL] = 'Connect cell';
RaceProcessLabels[RaceProcesses.ATTACK_ENEMY] = 'Attack cell';

const CellProceedResults = {
    RESOURCE_RESEARCHED: 'rr',
    FABRIC_BUILDED: 'fb',
    CELL_CONNECTED: 'cc',
    CELL_DESTROYED: 'cd'
};

export {ResourceTypeNames, getRandomType, CellResourceItem, CellTypes, RaceProcesses, CellProceedResults, RaceProcessLabels};