import {Helper} from '../helper';
import Bus from '../bus.js';
import { CellTypes } from './resource';

if (typeof window.Bus === 'undefined') {
    window.Bus = Bus;
}

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
        this.targetStack = [];
        window.Bus.$on('i-am-next', (payload) => {
            this.onCellIAmNextResponse(payload);
        });
        window.Bus.$on('cell-process-decline', this.onCellProcessDecline);
        window.Bus.$on('cell-proceed', this.onCellProceed);
        window.Bus.$on('resources-pack', this.onReceiveResourcesPack);
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
    setProcess(process, target) {
        this.process = process;
        this.target = target;
    }
    getTarget() {

        const prefs = this.props.getPreferences();

        const calculateMultipier = (process) => {
            let m = 0.2;
            for (let i in prefs) {
                if (prefs[i] === process) {
                    break;
                }
                m += 0.2;
            }
            return m;
        };

        if (this.targetStack.length === 0) {
            console.log('getTarget empty');
            return null;
        }
        const calculateDistantion = (point1, point2) => {
            return Math.sqrt( Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) , 2);;
        }
        let stack = this.targetStack.map((item) => {
            return {
                value: calculateDistantion(item.coords, this.coords) * calculateMultipier(item.process, prefs),
                coords: item.coords,
                process: item.process
            }
        });
        stack.sort(function(before, next) {
            return before.value - next.value;
        });

        const firstValue = stack[0].value;
        stack = stack.filter(item => item.value <= firstValue);
        let target = stack[0];
        /*if (stack.length > 1) {
            const rand = Helper.randomizer(stack.length);
            target = stack[rand];
        }*/
        console.log('getTarget', target);
        return target;
    }
    clearStack() {
        this.targetStack.length = 0;
    }
    /**
     * response from cell who can be processed
     * @param payload {{
     *      from: {*}
     *      to: {*}
     * }}
     */
    onCellIAmNextResponse(payload) {
        if (parseInt(payload.to) !== this.id.i) {
            return false;
        }
        if (parseInt(payload.from.owner) === this.id.i) {
            return false;
        }
        const item = {
            coords: payload.from.coords,
            process: this.getProcessNameByCell(payload.from.type, payload.from.owner),
            type: payload.from.type
        };
        this.targetStack.push(item);
    }
    /**
     * response from cell after request 'cell-process' if cell can't be proceed;
     * so its required to repeat find targets
     */
    onCellProcessDecline() {
        this.setProcess(null, null);
        this.clearStack();
    }
    /**
     * response from cell after request 'cell-process' if cell fully proceed
     * so its required to find new targets
     */
    onCellProceed() {
        this.setProcess(null, null);
        this.clearStack();
    }
    onReceiveResourcesPack(payload) {
        //@todo
        throw Error('not inmplemented');
    }
    /**
     * define a process for target
     * @param {*} cellType 
     * @param {*} cellOwner 
     */
    getProcessNameByCell(cellType, cellOwner) {
        if (cellType === CellTypes.SHADOW) {
            return RaceProcesses.RESEARCH_CELL;
        } else if (cellType === CellTypes.RESOURCE && cellOwner !== null && cellOwner !== this.id.i) {
            const prefs = this.props.getPreferences();
            for (let pref in prefs) {
                if (pref === RaceProcesses.ATTACK_ENEMY) {
                    return RaceProcesses.ATTACK_ENEMY;
                }
                if (pref === RaceProcesses.CONNECT_CELL) {
                    return RaceProcesses.CONNECT_CELL;
                }
            }
        } else if (cellType === CellTypes.RESOURCE) {
            return RaceProcesses.BUILD_FABRIC;
        }
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