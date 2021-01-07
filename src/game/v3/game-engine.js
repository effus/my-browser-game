//import {ResourceTypeNames, TypeScores, getRandomType} from './resource';
import Bus from '../bus';
import {Race, Races} from './race';

class GameEngine {
    constructor(raceCount, mapSize) {
        this.races = new Races();
        console.log('GameEngine create');
        for (let i = 0; i < raceCount; i++) {
            const race = new Race(i, raceCount, mapSize);
            this.races.add(race);
            Bus.$emit('set-race-base-cell', {
                raceId: i,
                coords: race.coords,
                raceType: race.type,
                props: race.props,
                color: race.color
            });
        }
        this.isTickInProgress = false;
    }
    nextTick() {
        if (this.isTickInProgress) {
            return;
        }
        this.isTickInProgress = true;
        for (let i in this.races.list) {
            const next = this.races.get(i).whatNext();
            if (next.process) {
                // increment
                Bus.$emit('cell-process', {
                    raceId: i,
                    coords: next.target,
                    process: next.process,
                    increment: next.increment
                });
            } else {
                // find target
                
            }
        }
        this.isTickInProgress = false;
    }
};

export default GameEngine;