<template>
  <div id="app">
    <base-info :ticks="tickCounter" :races="racesInfo"></base-info>
    <base-map :width="parseInt(map.size)" :height="parseInt(map.size)" :ticks="tickCounter"></base-map>
    <div class="buttons">
      <button @click="onClickStart" :disabled="this.gameEngine !== null">Start</button>
      <button @click="changeTab('log')">Game log</button>
      <button @click="changeTab('config')">Config</button>
    </div>
    <base-game-log :is-visible="tabs.isGameLogVisible" :log="log"></base-game-log>
    <div class="config" v-if="tabs.isConfigVisible">
      <div class="option">
        <label>Race count ({{map.raceCount}}):</label>
        <input type="range" v-model="map.raceCount" :min="1" :max="4" :disabled="this.gameEngine !== null">
      </div>
      <div class="option">
        <label>Map side size ({{map.size}}):</label>
        <input type="range" v-model="map.size" :min="3" :max="13" :disabled="this.gameEngine !== null">
      </div>
    </div>
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import BaseMap from './components/BaseMap.vue';
import BaseInfo from './components/BaseInfo.vue';
import BaseGameLog from './components/BaseGameLog.vue';
import GameEngine from './game/v3/game-engine';
import Bus from './game/bus';

if (typeof window.Bus === 'undefined') {
    window.Bus = Bus;
}

export default {
    components: {BaseMap,BaseInfo, BaseGameLog},
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
            tabs: {
              isGameLogVisible: false,
              isConfigVisible: false,
            },
            gameLog: []
        }
    },
    mounted() {
        window.Bus.$on('game-log', (str) => {
          this.gameLog.push((new Date()).toLocaleTimeString() + ' ' + str);
        });
        window.Bus.$on('global-error', this.onGlobalError);
        window.Bus.$on('stop', (p) => {
          console.error('STOPPED', p);
          this.gameLog.push('GAME STOPPED');
          this.$timer.stop('nextTick');
        });
        window.Bus.$on('we-got-winner', (race) => {
          this.gameLog.push('WE HAVE A WINNER!');
          this.$timer.stop('nextTick');
        });
    },
    timers: {
        nextTick: { time: 1000, autostart: false, repeat: true }
    },
    methods: {
      startGame() {
        this.gameEngine = new GameEngine(parseInt(this.map.raceCount), parseInt(this.map.size));
        this.$timer.start('nextTick');
      },
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
      },
      changeTab(tab) {
        this.tabs.isGameLogVisible = false;
        this.tabs.isConfigVisible = false;
        if (tab === 'log') {
          this.tabs.isGameLogVisible = true;
        } else if (tab === 'config') {
          this.tabs.isConfigVisible = true;
        }
      },
      onClickStart() {
        this.startGame();
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
  grid-template-rows: 1fr 3fr 20px 130px;
  grid-template-columns: 1fr;
  height: 100%;
  box-sizing: border-box;
  .buttons {
    padding-left: 5px;
    button {
        background-color: #000;
        color: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        border-bottom: 1px solid grey;
        padding: 5px;
        margin-right: 5px;
        box-sizing: border-box;
        &:hover {
            border: 1px solid #fff;
            box-shadow: 0px 0px 8px #fff;
        }
        &:disabled {
            border: 1px solid #000;
            box-shadow: none;
            color: #3d3d3d;
        }
        &:disabled:hover {
            box-shadow: none;
        }
    }
  }
  .config {
    padding: 5px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    .option {
      align-self: center;
      display: flex;
    }
  }
}
</style>