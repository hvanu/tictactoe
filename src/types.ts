export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = readonly Cell[];
export type WinningLine = readonly [number, number, number];

export type GameStatus = 'in-progress' | 'won' | 'draw';

export interface GameState {
  readonly board: Board;
  readonly currentPlayer: Player;
  readonly status: GameStatus;
  readonly winner?: Player;
  readonly winningLine?: WinningLine;
}
