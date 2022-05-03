<template>
  <nav class="navbar">
    <div class="rule-btn-wrapper">
      <button class="navbar__btn btn--rule" @click="showRule = !showRule">
        <ion-icon name="information-circle-outline"></ion-icon>
      </button>
      <Rule :is-open="showRule" @closeRule="showRule = false" />
    </div>
    <a
      href="https://github.com/vii120/minesweeper"
      target="_blank"
      class="navbar__btn"
    >
      <ion-icon name="logo-github"></ion-icon>
    </a>
    <ThemeBtn />
  </nav>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useGame } from '@/store';
import ThemeBtn from './ThemeBtn.vue';
import Rule from './Rule.vue';

const gameStore = useGame();
const showRule = ref(false);

watch(
  () => gameStore.isMobile,
  (val) => {
    if (val) showRule.value = true;
  },
  { immediate: true },
);
</script>

<style lang="scss">
.navbar {
  position: relative;
  width: 100%;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ion-icon {
    font-size: 0.3rem;
  }
  .navbar__btn {
    margin-right: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
    @include flexCenter;
    border-radius: 50%;
    box-shadow: $shadow-outer;
  }
  .rule-btn-wrapper {
    position: relative;
  }
}
</style>
