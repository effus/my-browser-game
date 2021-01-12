<template>
    <div class="gamelog" v-if="isVisible">
        <div v-for="(str,i) in log" :key="i">
            <span v-html="str"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        log: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss">
@import '../game/v3/colors.scss';
.gamelog {
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
    .time {
        color: #cccccc;
    }
    .race-name {
        &.yellow {
            color: $yellow;
        }
        &.white {
            color: $white;
        }
        &.red {
            color: $red;
        }
        &.blue {
            color: $blue;
        }
        &.brown {
            color: $brown;
        }
        &.purple {
            color: $purple;
        }
        &.orange {
            color: $orange;
        }
        &.dark-green {
            color: $dark-green;
        }
        &.light-green {
            color: $light-green;
        }
        &.pink {
            color: $pink;
        }
    }
}
.gamelogcollapsed {
    display: none;
    width: 100%;
    
    height: 26px;
    justify-content: flex-end;
    
}
</style>