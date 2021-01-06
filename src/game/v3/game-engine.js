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
    }
};

export default GameEngine;