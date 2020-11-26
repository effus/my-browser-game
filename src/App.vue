<template>
  <div id="app">
    <base-info :selected="selected" :year="game ? game.year : 0"></base-info>
    <base-options v-if="!game" v-on:setup="onSetup"></base-options>
    <base-loading v-if="game && game.isGenerating"></base-loading>
    <base-map v-if="game" :width="game.mapSize.width" :height="game.mapSize.height"></base-map>
    <div class="debug" v-if="false">{{game}}</div>
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import BaseOptions from './components/BaseOptions.vue';
import BaseLoading from './components/BaseLoading.vue';
import BaseMap from './components/BaseMap.vue';
import BaseInfo from './components/BaseInfo.vue';
import Game from './game/v2/game.js';
import Bus from './game/bus.js';

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
    this.game = new Game(
      {
        mapSizeWidth: 12,
        mapSizeHeight: 12,
        racesCount: 2,
        initialPopulationSize: 10,
        ageLimit: 90
      }
    );
    Bus.$on('show-info', this.onSelect);
  },
  methods: {
    onSetup(payload) {
      this.options = payload;
      this.game = new Game(payload);
    },
    onSelect(payload) {
      this.selected.cell = payload.cell;
      console.log('onSelect', payload);
      if (payload.race) {
        this.selected.race = payload.race;
      }
    },
    newYear() {
      this.game.newYear();
      /*if (!this.game) {
        return;
      }
      this.game.newYear();
      if (this.game.year === 1) {
        this.$bus.$emit('start');
      } else {
        this.$bus.$emit('race-get-stat');
      }*/
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
