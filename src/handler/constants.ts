export const BOARD_SIZE = 9;
export const MINE_COUNT = 10;

export const GAME_STATUS = Object.freeze({
  DEFAULT: 'default',
  PLAY: 'play',
  WIN: 'win',
  LOSE: 'lost',
});

export const THEME_MAP = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

// all combinations of [-1, 0, 1]*[-1, 0, 1] except [0,0]
export const ADJACENT_GRID_DELTA = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const TOAST_MSG = Object.freeze({
  WIN: 'Congratulations! You win 🎉!',
  LOSE: 'Oops, you stepped on a mine 🤕!',
});
