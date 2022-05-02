<template>
  <div class="board-wrapper">
    <div class="board-list">
      <div
        class="board-list__row"
        v-for="(row, rKey) in board"
        :key="`row_${rKey}`"
      >
        <div
          class="board-list__cell"
          :class="{
            'board-list__cell--clickable':
              !gameOver && !cell.isRevealed && !cell.isFlagged,
            'board-list__cell--revealed':
              cell.isRevealed || (gameOver && cell.isMine),
            'board-list__cell--error':
              gameOver && cell.isFlagged && !cell.isMine,
          }"
          :data-count="cell.count || null"
          v-for="(cell, ckey) in row"
          :key="`cell_${ckey}`"
          @click="gameStore.handleCellClick(rKey, ckey)"
          @contextmenu="(e) => onContextmenu(e, rKey, ckey)"
          @dblclick="gameStore.expandFromCell(rKey, ckey)"
        >
          <span v-if="gameOver">
            <template v-if="cell.isMine">
              <ion-icon name="skull"></ion-icon>
            </template>
            <template v-else-if="cell.isFlagged">
              <ion-icon name="flag"></ion-icon>
            </template>
            <template v-else-if="cell.count">{{ cell.count }}</template>
          </span>
          <span v-else>
            <template v-if="cell.isRevealed"> {{ cell.count || '' }}</template>
            <template v-else-if="cell.isFlagged">
              <ion-icon name="flag"></ion-icon>
            </template>
          </span>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGame } from '@/store';
import { GAME_STATUS } from '@/handler/constants';
import Toast from './Toast.vue';

const gameStore = useGame();
const { board, gameStatus } = storeToRefs(gameStore);

const gameOver = computed<boolean>(() => gameStatus.value === GAME_STATUS.LOSE);

const onContextmenu = (e: MouseEvent, row: number, col: number) => {
  e.preventDefault();
  gameStore.handleCellFlag(row, col);
};
</script>

<style lang="scss">
$count-colors: #4d8bbf, #3f924f, #bb3e51, #5f2a7e, #f2e640, #19214d, #6bc144,
  #a86c38;

.board-wrapper {
  position: relative;
  .board-list {
    width: 7rem;
    height: 7rem;
    margin: auto;
    @include flexCenter(col);
    border-radius: $main-bdrs;
    box-shadow: $shadow-outer;
    &__row {
      @include flexCenter;
    }
    &__cell {
      position: relative;
      width: 0.6rem;
      height: 0.6rem;
      margin: 0.05rem;
      @include flexCenter;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 0.1rem;
      background-color: var(--bg-color);
      box-shadow: $shadow-outer;
      transition: box-shadow 0.3s, background-color 0.3s;
      cursor: pointer;
      // gradient background for hover
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-image: var(--btn-hover-mask);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s;
      }
      &--clickable:hover::before {
        opacity: 1;
        visibility: visible;
      }
      &--revealed {
        box-shadow: $shadow-inner;
      }
      &--error {
        background-color: rgba(indianred, 0.3);
      }
      @for $i from 1 through length($count-colors) {
        &[data-count='#{$i}'] {
          color: nth($count-colors, $i);
        }
      }
    }
  }
  ion-icon {
    &[name='flag'] {
      color: #cb3333;
    }
    &[name='flag'] {
      color: #cb3333;
    }
  }
}
</style>
