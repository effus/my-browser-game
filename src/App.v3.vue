<template>
  <div id="app">
    <base-info :ticks="tickCounter" :races="racesInfo"></base-info>
    <!-- base-options v-if="!game" v-on:setup="onSetup"></base-options -->
    <!-- base-loading v-if="game && game.isGenerating"></base-loading -->
    <base-map :width="map.size" :height="map.size" :ticks="tickCounter"></base-map>
    <!-- div class="debug" v-if="false">{{game}}</div -->
    <div class="game-log">
      <div v-for="(str,i) in log" :key="i">
        {{str}}
      </div>
    </div>
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
              size: 3
            },
            info: null,
            gameEngine: null,
            tickCounter: 0,
            gameLog: []
        }
    },
    mounted() {
        window.Bus.$on('game-log', (str) => {
          this.gameLog.push((new Date()).toLocaleTimeString() + ' ' + str);
        });
        this.gameEngine = new GameEngine(this.map.raceCount, this.map.size);
        window.Bus.$on('global-error', this.onGlobalError);
        window.Bus.$on('stop', (p) => {
          console.error('STOPPED', p);
          this.gameLog.push('GAME STOPPED');
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
          this.gameEngine.nextTick(this.tickCounter);
        } catch (e) {
          this.onGlobalError(e);
        }
      },
      onGlobalError(e) {
        console.error('Global error', e);
        this.gameLog.push('GAME STOPPED during error');
        this.$timer.stop('nextTick');
      }
    },
    computed: {
      racesInfo() {
        return this.gameEngine ? this.gameEngine.getRaceInfo() : [];
      },
      log() {
        return this.gameLog.slice().reverse();
      }
    }
}
</script>

<style lang="scss">
body,html {
    background-color: #000;
    height: 100%;
    padding: 0;
    margin: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 1fr 3fr 130px;
  grid-template-columns: 1fr;
  height: 100%;
  box-sizing: border-box;
  .game-log {
    overflow: auto;
    width: 100%;
    max-height: 130px;
    box-sizing: border-box;
    background-color: rgb(12, 15, 15);
    padding: 5px;
    div {
      font-size: 12px;
      color: yellow;
    }
  }
}
</style>