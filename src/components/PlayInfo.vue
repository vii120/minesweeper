<template>
  <div class="info-wrapper">
    <div>time: {{ timeCount }}</div>
    <div>remain: {{ remainMines }}</div>
    <button class="btn--reset" v-if="!isPlaying" @click="gameStore.handleReset">
      reset
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGame } from '@/store';
import { GAME_STATUS } from '@/handler/constants';

const gameStore = useGame();
const { remainMines, gameStatus } = storeToRefs(gameStore);

const isPlaying = computed(() => gameStatus.value === GAME_STATUS.PLAY);

const timer = ref<ReturnType<typeof setInterval> | null>(null);
const timeCount = ref<number>(0);

watch(
  () => isPlaying.value,
  (val) => {
    if (val) {
      timeCount.value = 0;
      timer.value = setInterval(() => {
        timeCount.value++;
      }, 1000);
    } else {
      clearInterval(timer.value as ReturnType<typeof setInterval>);
    }
  },
);

onUnmounted(() => {
  clearInterval(timer.value as ReturnType<typeof setInterval>);
});
</script>

<style lang="scss">
.info-wrapper {
  height: 2rem;
}
</style>
