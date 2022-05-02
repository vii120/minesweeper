<template>
  <div class="board-wrapper">
    <div>status: {{ gameStatus }}</div>
    <div class="board-list">
      <div
        class="board-list__row"
        v-for="(row, rKey) in board"
        :key="`row_${rKey}`"
      >
        <div
          class="board-list__cell"
          :class="{
            mine: cell.isMine,
            reveal: cell.isRevealed,
          }"
          v-for="(cell, ckey) in row"
          :key="`cell_${ckey}`"
          @click="gameStore.handleCellClick(rKey, ckey)"
          @contextmenu="(e) => onContextmenu(e, rKey, ckey)"
          @dblclick="gameStore.expandFromCell(rKey, ckey)"
        >
          <span v-if="gameStatus === GAME_STATUS.LOSE">
            {{ cell.isMine ? '💣' : cell.count || '' }}
          </span>
          <span v-else>
            {{ cell.isRevealed && cell.count ? cell.count : '' }}
            {{ cell.isFlagged ? '🚩' : '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGame } from '@/store';
import { GAME_STATUS } from '@/handler/constants';

const gameStore = useGame();
const { board, gameStatus } = storeToRefs(gameStore);

const onContextmenu = (e: MouseEvent, row: number, col: number) => {
  e.preventDefault();
  gameStore.handleCellFlag(row, col);
};
</script>

<style lang="scss" scoped>
.board-wrapper {
  padding: 0.3rem;
}
.board-list {
  &__row {
    @include flexCenter;
  }
  &__cell {
    width: 0.6rem;
    height: 0.6rem;
    border: 1px solid #000;
    @include flexCenter;
    cursor: pointer;
    &.reveal {
      background-color: #fff;
    }
    &.mine {
      // border: 3px solid indianred;
    }
  }
}
</style>
