<template>
  <div id="app">
    <!-- base-info :object="selectedObject"></base-info -->
    <!-- base-options v-if="!game" v-on:setup="onSetup"></base-options -->
    <!-- base-loading v-if="game && game.isGenerating"></base-loading -->
    <base-map :width="20" :height="20"></base-map>
    <!-- div class="debug" v-if="false">{{game}}</div -->
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers';
import BaseMap from './components/BaseMap.vue';
import BaseInfo from './components/BaseInfo.vue';
export default {
    components: {BaseMap,BaseInfo},
    mixins: [VueTimers],
    data: () => {
        return {
            selectedObject: null,
            game: null
        }
    },
    mounted() {
        
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