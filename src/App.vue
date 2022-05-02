<template>
  <PlayInfo />
  <Playground />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Playground from '@/components/Playground.vue';
import PlayInfo from '@/components/PlayInfo.vue';
import { useGame } from '@/store';

const { initBoard } = useGame();

onMounted(() => {
  initBoard();
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  padding: 0.3rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  font-size: 0.24rem;
  background-color: wheat;
}
</style>
