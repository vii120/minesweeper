<template>
  <div class="theme-btn-wrapper">
    <button
      class="btn--theme"
      :class="{ dark: theme === THEME_MAP.DARK }"
      @click="toggleTheme"
    >
      <div class="dot"></div>
      <ion-icon name="sunny"></ion-icon>
      <ion-icon name="moon"></ion-icon>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGeneral } from '@/store';
import { THEME_MAP } from '@/handler/constants';

const generalStore = useGeneral();
const { toggleTheme } = useGeneral();
const { theme } = storeToRefs(generalStore);
</script>

<style lang="scss">
.theme-btn-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  .btn--theme {
    width: 1.6rem;
    height: 0.7rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
    box-shadow: $shadow-inner;
    &.dark {
      .dot {
        transform: translateX(0.8rem);
      }
      ion-icon {
        &[name='sunny'] {
          opacity: 0.5;
        }
        &[name='moon'] {
          opacity: 1;
        }
      }
    }
    ion-icon {
      color: orange;
      font-size: 0.36rem;
      &[name='sunny'] {
        opacity: 1;
      }
      &[name='moon'] {
        opacity: 0.5;
      }
    }
    .dot {
      position: absolute;
      left: 0.15rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      box-shadow: $shadow-outer;
      transition: transform 0.3s;
    }
  }
}
</style>
