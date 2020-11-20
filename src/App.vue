<template>
  <div id="app">
    <base-info :selected="selected" :year="game ? game.year : 0"></base-info>
    <base-options v-if="!game" v-on:setup="onSetup"></base-options>
    <base-loading v-if="game && game.isGenerating"></base-loading>
    <base-map v-if="game && !game.isGenerating" :map="game.map.mapGrid" :races="game.races" v-on:select="onSelect"></base-map>
    <div class="debug" v-if="false">{{game}}</div>
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import BaseOptions from './components/BaseOptions.vue';
import BaseLoading from './components/BaseLoading.vue';
import BaseMap from './components/BaseMap.vue';
import BaseInfo from './components/BaseInfo.vue';
import Game from './game/game.js';

export default {
  name: 'App',
  components: {BaseOptions, BaseLoading, BaseMap, BaseInfo},
  mixins: [VueTimers],
  data: () => {
    return {
      game: null,
      selected: {
        cell: null,
        resource: null,
        race: null
      }
    }
  },
  timers: {
    newYear: { time: 5000, autostart: true, repeat: true }
  },
  mounted() {
    // sample
    this.game = new Game({
      mapSizeWidth: 12,
      mapSizeHeight: 12,
      racesCount: 2,
      population: 10,
      ageLimit: 90
    });
  },
  methods: {
    onSetup(payload) {
      this.options = payload;
      this.game = new Game(payload);
    },
    onSelect(item) {
      this.selected.cell = this.game.map.grid[item.y][item.x];
      console.log('onSelect', item, this.selected);
      if (this.selected.cell.type === 1) {
        this.selected.race = this.game.races[this.selected.cell.baseOfRace];
      }
    },
    newYear() {
      if (!this.game) {
        return;
      }
      this.game.newYear();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 2fr 10fr;
  grid-gap: 10px;
}

.debug {
  overflow: auto;
  height: 10%;
  width: 95%;
  position: absolute;
  bottom: 10%;
  background-color: #2c3e50;
  color: #fff;
  font-size: 10px;
}
</style>
