import {CellResourceItem, CellTypes, RaceProcesses} from './resource';
import {CellRace} from './race';

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
        this.ownerColor = null;
        this.progress = 0;
        this.sendedAt = null;
        this.conflictsCount = 0;
    }
    changeToRace(i, raceType, color) {
        if (this.race !== null) {
            throw Error('Cell already occupied');
        }
        this.type = CellTypes.RACE;
        this.race = new CellRace(i, raceType, color);
        this.setOwner(i, color);
    }
    changeToResource(resourceType) {
        this.type = CellTypes.RESOURCE;
        this.resource = new CellResourceItem(resourceType);
    }
    changeToRandomResource() {
        this.type = CellTypes.RESOURCE;
        this.resource = new CellResourceItem();
    }
    setOwner(raceId, color) {
        this.owner = raceId;
        this.ownerColor = color;
    }
    getStyles() {
        let r = [];
        r.push(this.type);
        if (this.type === CellTypes.RESOURCE) {
            r.push(this.resource.getStyle());
            if (this.ownerColor) {
                r.push(this.ownerColor);
            }
        } else if (this.type === CellTypes.RACE) {
            r.push(this.race.getStyle());
        }
        return r;
    }
    checkCoords(coords) {
        return this.coords.x === coords.x && this.coords.y === coords.y;
    }
    checkAmINext(raceId) {
        if (this.type === CellTypes.SHADOW) {
            return true;
        } else if (this.type === CellTypes.RESOURCE && parseInt(this.owner) !== parseInt(raceId)) {
            return true;
        } /* else if (this.type = CellTypes.RACE && this.owner !== raceId) {
            return true;
        }*/
    }
    getSelfInfo() {
        return {
            coords: this.coords,
            type: this.type,
            owner: this.owner
        }
    }
    /**
     * proceed a cell on increment value
     * if increment >= 100, process is completed (true)
     * if process not assigned with cell type, process is declined (false)
     * if process not finished, return value is null
     * @param {*} raceId 
     * @param {*} process 
     * @param {*} increment 
     */
    tryProceed(raceId, process, increment) {
        if (this.type === CellTypes.RESOURCE && this.owner === null && process === RaceProcesses.BUILD_FABRIC) {
            this.progress += increment;
        } else if (this.type === CellTypes.SHADOW && process === RaceProcesses.RESEARCH_CELL) {
            this.progress += increment;
        } else if (this.type === CellTypes.RESOURCE && parseInt(this.owner) !== parseInt(raceId) && process === RaceProcesses.CONNECT_CELL) {
            this.progress += increment;
        } else {
            this.conflictsCount++;
            console.error('tryProceed error: incorrect process for resource', process, this.resource, this.owner);
            if (this.conflictsCount > 5) {
                throw Error('tryProceed error: conflicted processes');
            }
            return false;
        }
        this.conflictsCount = 0;
        if (this.progress >= 100) {
            return true;
        }
        return null;
    }
    onProceedComplete(process, raceId, ownerColor) {
        this.resetProgress();
        if (this.type === CellTypes.SHADOW) {
            this.changeToRandomResource();
        } else if (this.type === CellTypes.RESOURCE && process === RaceProcesses.BUILD_FABRIC) {
            this.setOwner(raceId, ownerColor);
        } else if (this.type === CellTypes.RESOURCE && process === RaceProcesses.CONNECT_CELL) {
            this.setOwner(raceId, ownerColor);
        }
    }
    resetProgress() {
        this.progress = 0;
    }
    /**
     * get resource scores for owner
     */
    getResourceForTick(raceId, tick, controlTick) {
        if (tick > this.sendedAt && tick <= controlTick+1 && this.owner !== null 
            && parseInt(this.owner) === parseInt(raceId) && this.type === CellTypes.RESOURCE) {
            this.sendedAt = tick;
            return this.resource.score;
        }
    }
};

export default CellEngine;