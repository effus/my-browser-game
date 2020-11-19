<template>
    <div class="options">
      <h1>Options</h1>
      <div class="options-grid">
        <div>Map size</div>
        <div>
          width: <input type="text" v-model="mapSizeWidth" placeholder=">10 and <=100" />
          height: <input type="text" v-model="mapSizeHeight" placeholder=">10 and <=100" />
        </div>
        <div>Races count</div>
        <div><input type="text" v-model="racesCount" placeholder=">0 and <=4" /></div>
      </div>
      <div class="actions">
        <button type="button" @click="onClickSetup">Generate</button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mapSizeWidth: 100,
            mapSizeHeight: 100,
            racesCount: 2
        }
    },
    methods: {
        onClickSetup() {
            this.$emit('setup', {
                mapSizeWidth: this.mapSizeWidth,
                mapSizeHeight: this.mapSizeHeight,
                racesCount: this.racesCount
            });
        }
    }
}
</script>

<style lang="scss">
.options {
    width: 90%;
    height: 50%;
    margin: 5% auto;
    background-color: #cccccc;
    border: 1px solid #a3a3a3;
    box-shadow: 1px 2px 11px #868686;
    padding: 10px;
    min-width: 300px;
    input[type=text] {
        padding: 2px;
        box-shadow: 1px 1px 3px #868686;
        border: 1px solid #a1a1a1;
        border-radius: 3px;
    }
    h1 {
        font-size: 24px;
        text-align: center;
        padding-top: 0;
        margin-top: 0;
    }
    .options-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 3px;
    }
    .actions {
        margin-top: 10px;
        button {
            padding: 5px 10px;
            box-shadow: 1px 1px 3px #868686;
            border: 1px solid #a1a1a1;
            border-radius: 3px;
            background-color: #d6d6d6;
            &:hover {
                background-color: #ececec;
            }
        }
    }
}
</style>