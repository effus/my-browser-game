'use strict';

import {RaceProcesses} from './v3/resource';

const Helper = {
    randomizer(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    getRandomCellInPart(i, n, size) {
        const partSize = Math.ceil((size * size) / n);
        let x = Math.ceil((partSize * i + Helper.randomizer(partSize)) / size);
        let y = Math.ceil((partSize * i + Helper.randomizer(partSize)) / size);
        if (x >= size) {
            x = size - 1;
        }
        if (y >= size) {
            y = size - 1;
        }
        return {x, y};
    },
    getRandomColor() {
        const colors = ['yellow', 'white', 'red', 'blue', 'brown', 'purple', 'orange', 'dark-green', 'light-green', 'pink'];
        const rand = this.randomizer(colors.length);
        return colors[rand];
    },
    calculateDistantion(point1, point2) {
        return Math.sqrt( Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) , 2);;
    },
    calculatePreferenceMultipier(process, preferences) {
        let m = 0.2;
        for (let i in preferences) {
            if (preferences[i] === process) {
                break;
            }
            m += 0.2;
        }
        return m;
    },
    humanLog(log, raceColor, raceType, process, opts) {
        const raceSpan = '<span class="race-name ' + raceColor + '">' + raceType + '</span>';
        if (log === 'race receive cell proceed') {
            if (process === RaceProcesses.RESEARCH_CELL) {
                return 'Race ' + raceSpan + ' finished research new cell';
            } else if (process === RaceProcesses.BUILD_FABRIC) {
                return 'Race ' + raceSpan + ' finished build a fabric for resource';
            } else if (process === RaceProcesses.CONNECT_CELL) {
                return 'Race ' + raceSpan + ' connecting a cell of other race to himself';
            } else if (process === RaceProcesses.ATTACK_ENEMY) {
                return 'Race ' + raceSpan + ' destroy a cell of other race';
            }
        }
        return log;
    }
}

export {Helper};