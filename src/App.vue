<template>
  <div id="app">
    <!-- img alt="Vue logo" src="./assets/icons/ammonite.svg" width="30" -->
    <base-options v-if="!game" v-on:setup="onSetup"></base-options>
    <base-loading v-if="game && game.isGenerating"></base-loading>
    <base-map v-if="game && !game.isGenerating" :map="game.map"></base-map>
    <div class="debug">
      {{game}}
    </div>
  </div>
</template>

<script>
import BaseOptions from './components/BaseOptions.vue';
import BaseLoading from './components/BaseLoading.vue';
import BaseMap from './components/BaseMap.vue';
import Game from './game/game.js';

export default {
  name: 'App',
  components: {BaseOptions, BaseLoading, BaseMap},
  data: () => {
    return {
      game: null
    }
  },
  mounted() {
    // sample
    this.game = new Game({
      mapSizeWidth: 12,
      mapSizeHeight: 12,
      racesCount: 2
    });
  },
  methods: {
    onSetup(payload) {
      this.options = payload;
      this.game = new Game(payload);
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
  margin-top: 60px;
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
