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

const RaceProcesses = {
    RESEARCH_CELL: 'research_cell',
    BUILD_FABRIC: 'build_fabric',
    CONNECT_CELL: 'connect_cell',
    ATTACK_ENEMY: 'attack_enemy'
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
        this.preferences = this.getPreferences();
    }
    getPreferences() {
        let baseSort = [
            this.hardworking + '_' + RaceProcesses.BUILD_FABRIC,
            this.research + '_' + RaceProcesses.RESEARCH_CELL,
            this.diplomacy + '_' + RaceProcesses.CONNECT_CELL,
            this.agressive + '_' + RaceProcesses.ATTACK_ENEMY 
        ];
        baseSort.sort();
        for (let i in baseSort) {
            baseSort[i] = baseSort[i].replace(/[0-9]_/g, '');
        }
        return baseSort;
    }
    getIncrementForProcess(process) {
        return this[process];
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
        this.resources = [];
        this.process = null;
        this.target = null;
    }
    whatNext() {
        if (this.process === null) {
            return {
                process: null,
                prefs: this.props.getPreferences()
            }
        } else {
            return {
                process: this.process,
                target: this.target,
                increment: this.props.getIncrementForProcess(this.process)
            }
        }
    }
    startProcess(process, target) {

    }
};

/**
 * все расы на карте
 */
class Races {
    constructor() {
        this.list = [];
    }
    add(race) {
        this.list.push(race);
    }
    get(i) {
        return this.list[i];
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