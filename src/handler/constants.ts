export const BOARD_SIZE = 9;
export const MINE_COUNT = 10;

export const GAME_STATUS = Object.freeze({
  DEFAULT: 'default',
  PLAY: 'play',
  WIN: 'win',
  LOSE: 'lost',
});

// all combinations of [-1, 0, 1]*[-1, 0, 1]
const gridDelta = [-1, 0, 1];
const gridAdjacent = [];
for (const i of gridDelta) {
  for (const j of gridDelta) {
    if (i === 0 && j === 0) continue;
    gridAdjacent.push([i, j]);
  }
}
export const ADJACENT_GRID_DELTA = gridAdjacent;
