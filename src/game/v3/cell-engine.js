import {CellResourceItem} from './resource';
import {CellRace} from './race';

/**
 * типы ячеек
 */
const CellTypes = {
    SHADOW: 'shadow',
    RACE: 'race',
    RESOURCE: 'resource'
};

/**
 * механика для ячейки
 */
class CellEngine {
    constructor(coords) {
        this.coords = coords;
        this.type = CellTypes.SHADOW;
        this.race = null;
        this.resource = null;
        this.owner = null;
        this.progress = 0;
    }
    changeToRace(i, raceType, color) {
        this.type = CellTypes.RACE;
        this.race = new CellRace(i, raceType, color);
        this.setOwner(i);
    }
    changeToResource(resourceType) {
        this.type = CellTypes.RESOURCE;
        this.resource = new CellResourceItem(resourceType);
    }
    changeToRandomResource() {
        this.type = CellTypes.RESOURCE;
        this.resource = new CellResourceItem();
    }
    setOwner(raceId) {
        this.owner = raceId;
    }
    getStyles() {
        let r = [];
        r.push(this.type);
        if (this.type === CellTypes.RESOURCE) {
            r.push(this.resource.getStyle());
        } else if (this.type === CellTypes.RACE) {
            r.push(this.race.getStyle());
        }
        return r;
    }
    checkCoords(coords) {
        return this.coords.x === coords.x && this.coords.y === coords.y;
    }
    incrementProgress(increment) {
        this.progress += increment;
        if (this.progress > 100) {
            this.progress = 100;
        }
    }
};

export default CellEngine;