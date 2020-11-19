<template>
    <div class="loading">
      <img alt="Vue logo" src="../assets/icons/ouroboros.svg" width="30" />
    </div>
</template>

<style lang="scss">
.loading {
    position: fixed;
    top: 10%;
    width: 100%;
    height: 10%;
    text-align: center;
    img {
        animation: roll 1s infinite;
    }
}
@keyframes roll {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>