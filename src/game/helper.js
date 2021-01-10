'use strict';

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
        const colors = ['yellow', 'white', 'red', 'blue'];
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
    }
}

export {Helper};