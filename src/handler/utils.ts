/* eslint-disable @typescript-eslint/no-explicit-any */
import { BOARD_SIZE } from '@/handler/constants';

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function isCellValid(
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number,
): boolean {
  return (
    row + deltaRow >= 0 &&
    col + deltaCol >= 0 &&
    row + deltaRow < BOARD_SIZE &&
    col + deltaCol < BOARD_SIZE
  );
}

// detect user device: mobile or desktop
export function detectDevice(): string {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}
