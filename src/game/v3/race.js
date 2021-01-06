import {Helper} from '../helper';

const RaceTypes = {
    BEAR: 'bear',
    TROLL: 'troll',
    TIGER: 'tiger',
    MASK: 'mask',
    SPIDER: 'spider',
    RAT: 'rat',
    MONKEY: 'monkey',
    CAT: 'cat',
    GOOSE: 'goose',
    EAGLE: 'eagle',
    BEE: 'bee'
};

const getRandomType = () => {
    const types = Object.keys(RaceTypes);
    const rand = Helper.randomizer(types.length);
    return RaceTypes[types[rand]];
};

class RaceProps {
    constructor() {
        this.hardworking = Helper.randomizer(10);
        this.research = Helper.randomizer(10);
        this.diplomacy = Helper.randomizer(10);
        this.agressive = Helper.randomizer(10);
    }
};

 /**
  * класс расы для игрового движка
  */
class Race {
    constructor(i, n, mapSize) {
        this.id = {i, n, mapSize};
        this.coords = Helper.getRandomCellInPart(i, n, mapSize);
        this.type = getRandomType();
        this.props = new RaceProps();
        this.color = Helper.getRandomColor();
    }
};

/**
 * все расы на карте
 */
class Races {
    constructor() {
        this.races = [];
    }
    add(race) {
        this.races.push(race);
    }
    get(i) {
        return this.races[i];
    }
}

/**
 * ячейка расы
 */
class CellRace {
    constructor(i, raceType, color) {
        this.i = i;
        this.raceType = raceType;
        this.color = color;
    }
    getStyle() {
        return this.raceType + ' ' + this.color;
    }
}

export {Race, Races, CellRace};