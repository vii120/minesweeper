<template>
  <div class="main">
    <ThemeBtn />
    <PlayInfo />
    <Playground />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Playground from '@/components/Playground.vue';
import PlayInfo from '@/components/PlayInfo.vue';
import ThemeBtn from '@/components/ThemeBtn.vue';
import { useGeneral, useGame } from '@/store';

const { initBoard } = useGame();
const { setThemeAttr } = useGeneral();

onMounted(() => {
  setThemeAttr();
  initBoard();
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  padding: 0.3rem;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color);
  font-size: 0.24rem;
  background-color: var(--bg-color);
  overflow-x: hidden;
  overflow-y: auto;
  transition: background-color 0.1s;
  .main {
    position: relative;
    max-width: 14rem;
    margin: auto;
    padding-top: 0.8rem;
  }
}
</style>
