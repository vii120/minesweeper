<template>
  <nav class="navbar">
    <div class="rule-btn-wrapper">
      <button class="navbar__btn btn--rule" @click="showRule = !showRule">
        <ion-icon name="chatbubble-ellipses"></ion-icon>
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
    <!-- rule: teleport -->
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ThemeBtn from './ThemeBtn.vue';
import Rule from './Rule.vue';

const showRule = ref(false);
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
