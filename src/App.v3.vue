<template>
  <div id="app">
    <!-- base-info :object="selectedObject"></base-info -->
    <!-- base-options v-if="!game" v-on:setup="onSetup"></base-options -->
    <!-- base-loading v-if="game && game.isGenerating"></base-loading -->
    <base-map :width="map.size" :height="map.size"></base-map>
    <!-- div class="debug" v-if="false">{{game}}</div -->
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import BaseMap from './components/BaseMap.vue';
import BaseInfo from './components/BaseInfo.vue';
import GameEngine from './game/v3/game-engine';

export default {
    components: {BaseMap,BaseInfo},
    mixins: [VueTimers],
    data: () => {
        return {
            map: {
              raceCount: 2,
              size: 20
            },
            info: null,
            gameEngine: null
        }
    },
    mounted() {
        this.gameEngine = new GameEngine(this.map.raceCount, this.map.size);
    },
    timers: {
        nextTick: { time: 5000, autostart: true, repeat: false }
    },
    methods: {
      nextTick() {
        this.gameEngine.nextTick();
      }
    }
}
</script>

<style lang="scss">
body {
    background-color: #000;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-gap: 10px;
}
</style>