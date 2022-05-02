import { defineStore } from 'pinia';
import {
  BOARD_SIZE,
  MINE_COUNT,
  GAME_STATUS,
  ADJACENT_GRID_DELTA,
} from '@/handler/constants';
import { shuffle, isCellValid } from '@/handler/utils';

type BoardItem = {
  isMine: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  count: number;
};
type GameType = {
  board: BoardItem[][];
  startFirstStep: boolean;
  gameStatus: typeof GAME_STATUS[keyof typeof GAME_STATUS]; // value of GAME_STATUS
};

const state = (): GameType => ({
  board: [],
  startFirstStep: false,
  gameStatus: GAME_STATUS.DEFAULT,
});

export default defineStore('game', {
  state,
  actions: {
    initBoard() {
      const flatBoard: BoardItem[] = shuffle(
        Array.apply([], Array(BOARD_SIZE * BOARD_SIZE)).map((_, key) => ({
          isMine: !!(key < MINE_COUNT),
          isFlagged: false,
          isRevealed: false,
          count: 0,
        })),
      );
      for (let i = 0; i < BOARD_SIZE; i++) {
        this.board[i] = flatBoard.slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE);
      }
    },
    handleReset() {
      this.startFirstStep = false;
      this.gameStatus = GAME_STATUS.DEFAULT;
      this.initBoard();
    },
    handleStart() {
      if (this.gameStatus === GAME_STATUS.DEFAULT) {
        this.gameStatus = GAME_STATUS.PLAY;
      }
    },
    handleCellClick(row: number, col: number) {
      this.handleStart();
      if (this.gameStatus !== GAME_STATUS.PLAY) return;
      const { isFlagged, isRevealed } = this.board[row][col];
      if (isFlagged || isRevealed) return;

      this.checkFirstStep(row, col);
      // after checking first step, the position of the mine may change
      if (this.board[row][col].isMine) {
        // this.board[row][col].isRevealed = true;
        this.gameStatus = GAME_STATUS.LOSE;
      } else {
        this.revealCell(row, col);
      }
    },
    revealCell(row: number, col: number, isExpand = false) {
      const queue: { row: number; col: number }[] = [];
      queue.unshift({ row, col });
      while (queue.length !== 0 && queue.length < 100) {
        const item = queue.shift();
        if (!item || this.gameStatus !== GAME_STATUS.PLAY) break;
        // normal situation: ignore revealed cell
        // expand mode: should consider revealed cell
        const clickedCell = isExpand && item.row === row && item.col === col;
        if (this.board[item.row][item.col].isRevealed && !clickedCell) continue;
        this.board[item.row][item.col].isRevealed = true;
        const tempQueue = []; // store unrevealed adjacent cells
        for (const [r, c] of ADJACENT_GRID_DELTA) {
          if (!isCellValid(item.row, item.col, r, c)) continue;
          const { isMine, isFlagged, isRevealed } =
            this.board[item.row + r][item.col + c];
          if (clickedCell && isMine && !isFlagged) {
            this.gameStatus = GAME_STATUS.LOSE;
            break;
          }
          if (isMine) {
            if (!clickedCell) this.board[item.row][item.col].count += 1;
          } else if (!isRevealed && !isFlagged) {
            tempQueue.push({ row: item.row + r, col: item.col + c });
          }
        }
        if (!this.board[item.row][item.col].count || clickedCell) {
          queue.push(...tempQueue);
        }
      }
      this.checkWinStatus();
    },
    checkFirstStep(row: number, col: number) {
      if (this.startFirstStep) return;
      this.startFirstStep = true;
      if (!this.board[row][col].isMine) return;
      for (let i = 0; i < this.flatBoard.length; i++) {
        if (!this.flatBoard[i].isMine) {
          const targetRow = Math.floor(i / BOARD_SIZE);
          const targetCol = i % BOARD_SIZE;
          this.board[row][col].isMine = false;
          this.board[targetRow][targetCol].isMine = true;
          break;
        }
      }
    },
    handleCellFlag(row: number, col: number) {
      this.handleStart();
      if (this.gameStatus !== GAME_STATUS.PLAY) return;
      if (this.board[row][col].isRevealed) return;
      this.board[row][col].isFlagged = !this.board[row][col].isFlagged;
      this.checkWinStatus();
    },
    checkWinStatus() {
      if (this.gameStatus !== GAME_STATUS.PLAY) return;
      if (this.remainMines !== 0) return;
      for (const el of this.flatBoard) {
        if (!el.isRevealed && !el.isFlagged) return; // not fully opened
        if (el.isMine && !el.isFlagged) return; // not fully flagged
      }
      this.gameStatus = GAME_STATUS.WIN;
    },
    expandFromCell(row: number, col: number) {
      if (this.gameStatus !== GAME_STATUS.PLAY) return;
      const { isRevealed, count } = this.board[row][col];
      if (!isRevealed || !count) return;
      // check flags around is eual to mine count
      let flagCount = 0;
      for (const [r, c] of ADJACENT_GRID_DELTA) {
        if (!isCellValid(row, col, r, c)) continue;
        flagCount += Number(this.board[row + r][col + c].isFlagged);
      }
      if (flagCount !== count) return;
      this.revealCell(row, col, true);
    },
  },
  getters: {
    flatBoard(state) {
      return state.board.flat();
    },
    remainMines(): number {
      return MINE_COUNT - this.flatBoard.filter((el) => el.isFlagged).length;
    },
  },
});
