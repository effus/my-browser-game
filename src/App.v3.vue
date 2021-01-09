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
import Bus from './game/bus';
if (typeof window.Bus === 'undefined') {
    window.Bus = Bus;
}

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
            gameEngine: null,
            tickCounter: 0
        }
    },
    mounted() {
        this.gameEngine = new GameEngine(this.map.raceCount, this.map.size);
        window.Bus.$on('global-error', this.onGlobalError);
        window.Bus.$on('stop', (p) => {
          console.log('STOPPED', p);
          this.$timer.stop('nextTick');
        });
        
    },
    timers: {
        nextTick: { time: 1000, autostart: true, repeat: true }
    },
    methods: {
      nextTick() {
        try {
          this.tickCounter++;
          console.log('nextTick started', this.tickCounter);
          this.gameEngine.nextTick();
        } catch (e) {
          this.$timer.stop('nextTick');
          console.error('tick stopped', e);
        }
      },
      onGlobalError(e) {
        console.error('Global error', e);
        this.$timer.stop('nextTick');
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