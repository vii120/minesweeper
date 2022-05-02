<template>
  <div class="rule-wrapper">
    <!-- @todo: overlay popup -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGame } from '@/store';

const gameStore = useGame();
const { board } = storeToRefs(gameStore);
</script>

<style lang="scss"></style>
