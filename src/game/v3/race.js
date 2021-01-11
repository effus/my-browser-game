import {Helper} from '../helper';
import Bus from '../bus.js';
import { CellTypes, RaceProcesses } from './resource';

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

const getRandomType = () => {
    const types = Object.keys(RaceTypes);
    const rand = Helper.randomizer(types.length);
    return RaceTypes[types[rand]];
};


class RaceProps {
    constructor() {
        this.hardworking = 10;//Helper.randomizer(9) + 1;
        this.research = 10;//Helper.randomizer(9) + 1;
        this.diplomacy = Helper.randomizer(9) + 1;
        this.agressive = Helper.randomizer(9) + 1;
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
            baseSort[i] = baseSort[i].replace(/(\d+|\d+\.\d+)_/g, '');
        }
        return baseSort;
    }
    getIncrementForProcess(process) {
        let mapping = {};
        mapping[RaceProcesses.RESEARCH_CELL] = 'research';
        mapping[RaceProcesses.BUILD_FABRIC] = 'hardworking';
        mapping[RaceProcesses.CONNECT_CELL] = 'diplomacy';
        mapping[RaceProcesses.ATTACK_ENEMY] = 'agressive';
        return this[mapping[process]];
    }
    addResourcePack(pack) {
        this.hardworking += pack.hardworking;
        this.research += pack.research;
        this.diplomacy += pack.diplomacy;
        this.agressive += pack.agressive;
    }
};

/**
 * resources of race
 */
class RaceResources {
    constructor() {
        this.food = 100;
        this.water = 100;
        this.metals = 100;
        this.stones = 100;
    }
    addResourcePack(pack) {
        this.food += pack.meal + pack.flour;
        this.water += pack.water;
        this.metals += pack.gold + pack.iron;
        this.stones += pack.stone;
    }
    decrease(cellCount) {
        this.food -= 0.1 * cellCount;
        this.water -= 0.1 * cellCount;
        this.metals -= 0.1 * cellCount;
        this.stones -= 0.1 * cellCount;
    }
}

 /**
  * race game engine
  */
class Race {
    constructor(i, n, mapSize) {
        this.id = {i, n, mapSize};
        this.coords = Helper.getRandomCellInPart(i, n, mapSize);
        this.type = getRandomType();
        this.props = new RaceProps();
        this.color = Helper.getRandomColor();
        this.resources = new RaceResources();
        this.process = null;
        this.target = null;
        this.targetStack = [];
        this.cellsCount = 1;
        window.Bus.$on('i-am-next', (payload) => this.onCellIAmNextResponse(payload));
        window.Bus.$on('cell-process-decline', (p) => this.onCellProcessDecline(p));
        window.Bus.$on('cell-proceed', (p) => this.onCellProceed(p));
        window.Bus.$on('resources-pack', (p) => this.onReceiveResourcesPack(p));
        window.Bus.$on('decrease-cell-count', (p) => this.onDecreaseCellCount(p));
        window.Bus.$on('increase-cell-count', (p) => this.onIncreaseCellCount(p));
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

    /**
     * main algorythm to choose next target cell
     */
    getTarget() {
        const prefs = this.props.getPreferences();
        if (this.targetStack.length === 0) {
            return null;
        }
        let stack = this.targetStack.map((item) => {
            return {
                value: Helper.calculateDistantion(item.coords, this.coords) * 
                    Helper.calculatePreferenceMultipier(item.process, prefs),
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
        if (stack.length > 1) {
            const rand = Helper.randomizer(stack.length);
            target = stack[rand];
        }
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
        try {
            const item = {
                coords: payload.from.coords,
                process: this.getProcessNameByCell(payload.from.type, payload.from.owner),
                type: payload.from.type
            };
            this.targetStack.push(item);
        } catch (e) {
            console.error('onCellIAmNextResponse exception', e);
            window.Bus.$emit('global-error', {e});
        }
    }
    /**
     * response from cell after request 'cell-process' if cell can't be proceed;
     * so its required to repeat find targets
     */
    onCellProcessDecline(payload) {
        this.setProcess(null, null);
        this.clearStack();
        console.debug('onCellProcessDecline', 'Race ' + this.id.i, payload);
        window.Bus.$emit('game-log', 'Race ' + this.id.i + ' receive [process-decline] from target ' + payload.from.coords.x + ':' + payload.from.coords.y + ' about process: ' + payload.process);
    }
    /**
     * response from cell after request 'cell-process' if cell fully proceed
     * so its required to find new targets
     */
    onCellProceed(payload) {
        if (parseInt(payload.to) !== this.id.i) {
            return;
        }
        this.setProcess(null, null);
        this.clearStack();
        window.Bus.$emit('game-log', 'Race ' + this.id.i + ' receive [process-complete] from target ' + payload.from.coords.x + ':' + payload.from.coords.y + ' about process: ' + payload.process);
        
    }
    onReceiveResourcesPack(payload) {
        if (parseInt(payload.to) !== this.id.i) {
            return;
        }
        this.resources.addResourcePack(payload.resources);
        this.props.addResourcePack(payload.resources);
    }
    /**
     * define a process for target
     * @param {*} cellType 
     * @param {*} cellOwner 
     */
    getProcessNameByCell(cellType, cellOwner) {
        if (cellType === CellTypes.SHADOW) {
            return RaceProcesses.RESEARCH_CELL;

        } else if (cellType === CellTypes.RESOURCE && cellOwner !== null && parseInt(cellOwner) !== parseInt(this.id.i)) {
            const prefs = this.props.getPreferences();
            for (let i in prefs) {
                if (prefs[i] === RaceProcesses.ATTACK_ENEMY) {
                    return RaceProcesses.ATTACK_ENEMY;
                }
                if (prefs[i] === RaceProcesses.CONNECT_CELL) {
                    return RaceProcesses.CONNECT_CELL;
                }
            }
            throw Error('Error in getProcessNameByCell: incorrect preferences');
        } else if (cellType === CellTypes.RESOURCE) {
            return RaceProcesses.BUILD_FABRIC;
        } else {
            throw Error('Error in getProcessNameByCell: unexpected cellType');
        }
    }
    decreaseResources() {
        this.resources.decrease(this.cellsCount);
    }
    onDecreaseCellCount(payload) {
        if (parseInt(payload.to) !== this.id.i) {
            return;
        }
        if (this.cellsCount > 0) {
            this.cellsCount--;
        }
    }
    onIncreaseCellCount(payload) {
        if (parseInt(payload.to) !== this.id.i) {
            return;
        }
        this.cellsCount++;
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