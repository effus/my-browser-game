'use strict';

import {Resource} from './resource.js';

const RaceTypes = () => {
    return {
        index: [
            'bear',
            'troll',
            'tiger',
            'mask',
            'spider',
            'rat',
            'monkey',
            'cat',
            'goose',
            'eagle',
            'bee'
        ]
    }
}

class Race {
    constructor(type) {
        this.resources = new Resource();
        this.type = type;
    }

    get name() {
        return RaceTypes().index[this.type];
    }
}

export {Race, RaceTypes};