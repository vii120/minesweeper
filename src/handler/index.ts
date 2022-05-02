/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

export class Board {
  list: number[][];
  constructor() {
    this.list = this.handleOpen('1');
  }

  handleOpen(item: string) {
    console.log('handleOpen', item);
    return [[1, 2, 3]];
  }
  handleFlag(item: string) {
    console.log('handleFlag', item);
  }
}
