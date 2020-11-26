'use strict';

import {Resource, ResourceTypes} from './resource.js';
import {Helper} from './helper.js';
import MapCell from './mapCell.js';
import Skills from './skills.js';


class Map {

    constructor(w, h) {
        this.grid = Array(h).fill(0).map((item, y) => {
            return Array(w).fill(0).map((item, x) => {
                const cell = new MapCell(x, y, Helper.randomizer(ResourceTypes().list.length - 3) + 2);
                cell.setSkills(new Skills(1,1,1,1)); // @todo
                cell.setResources(1,1,1,1,1,1,1);
                return cell;
            });
        });
        this.fillNeibours();
    }

    
    get mapGrid() {
        return this.grid;
    }

    
    get mapSize() {
        return {
            width: this.grid[0].length,
            height: this.grid.length
        }
    }

    setRaceBase(raceIndex, raceCount, raceType) {
        const partSize = Math.ceil((this.mapSize.width * this.mapSize.height) / raceCount);
        let x = Math.ceil((partSize * raceIndex + Helper.randomizer(partSize)) / this.mapSize.width);
        let y = Math.ceil((partSize * raceIndex + Helper.randomizer(partSize)) / this.mapSize.height);
        if (x >= this.mapSize.width) {
            x = this.mapSize.width - 1;
        }
        if (y >= this.mapSize.height) {
            y = this.mapSize.height - 1;
        }
        this.grid[x][y].setRaceBase(raceIndex);
    }

    fillNeibours() {
        // @todo
    }
}

export {Map};