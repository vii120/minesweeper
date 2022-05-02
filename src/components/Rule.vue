<template>
  <div class="rule-wrapper">
    <!-- @todo: popup folder? -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGame } from '@/store';

const gameStore = useGame();
const { board } = storeToRefs(gameStore);
</script>

<style lang="scss"></style>
