//import {ResourceTypeNames, TypeScores, getRandomType} from './resource';
import Bus from '../bus';
import {Race, Races} from './race';

if (typeof window.Bus === 'undefined') {
    window.Bus = Bus;
}

class GameEngine {
    constructor(raceCount, mapSize) {
        this.races = new Races();
        this.mapSize = mapSize;
        console.log('GameEngine create');
        for (let i = 0; i < raceCount; i++) {
            const race = new Race(i, raceCount, mapSize);
            this.races.add(race);
            window.Bus.$emit('set-race-base-cell', {
                raceId: i,
                coords: race.coords,
                raceType: race.type,
                props: race.props,
                color: race.color
            });
        }
        window.Bus.$emit('game-log', 'Game started with ' + raceCount + ' races and map ' + mapSize + 'x' + mapSize);
        this.isTickInProgress = false;
    }
    nextTick(tickNumber) {
        if (this.isTickInProgress) {
            return;
        }
        this.isTickInProgress = true;
        for (let i in this.races.list) {
            // collect resources from processed targets
            window.Bus.$emit('get-resources', {
                raceId: i,
                tick: tickNumber
            });
            this.races.get(i).decreaseResources();
            if (this.checkWinner(this.races.get(i)) === true) {
                window.Bus.$emit('we-got-winner', {
                    winner: this.races.get(i)
                });
                break;
            }
            let next = this.races.get(i).whatNext(); // get a target from previous tick
            if (!next.process) {
                // no processed targets
                const target = this.races.get(i).getTarget();
                if (target !== null) {
                    // have a target, collected by 'i-am-next' response and choose by
                    // coordinates and preferences
                    next = {
                        target: target.coords,
                        process: target.process,
                        increment: 0
                    };
                    this.races.get(i).setProcess(target.process, target.coords);
                    this.races.get(i).clearStack();
                } else {
                    window.Bus.$emit('who-is-next', {
                        raceId: i,
                        coords: this.races.get(i).coords
                    });
                    continue;
                }
            }
            // process target
            window.Bus.$emit('cell-process', {
                raceId: i,
                raceColor: this.races.get(i).color,
                coords: next.target,
                process: next.process,
                increment: next.increment
            });
        }
        this.isTickInProgress = false;
    }
    getRaceInfo() {
        return this.races.list;
    }
    checkWinner(race) {
        if (race.cellsCount >= this.mapSize * this.mapSize - this.races.list.length) {
            return true;
        }
        return false;
    }
};

export default GameEngine;