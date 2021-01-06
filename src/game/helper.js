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
        const colors = ['grey', 'white', 'red'];
        const rand = this.randomizer(colors.length);
        return colors[rand];
    }
}

export {Helper};