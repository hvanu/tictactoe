import type { Board, GameState, GameStatus, Player, WinningLine } from './types';

export const BOARD_WIDTH = 3;
export const CELL_COUNT = BOARD_WIDTH * BOARD_WIDTH;

const WINNING_LINES: readonly WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function evaluateBoard(board: Board): {
  status: GameStatus;
  winner?: Player;
  winningLine?: WinningLine;
} {
  for (const line of WINNING_LINES) {
    const [l_a, l_b, l_c] = line;
    const player = board[l_a];

    if (player && player === board[l_b] && player === board[l_c]) {
      return { status: 'won', winner: player, winningLine: line };
    }
  }

  return board.every((cell) => cell !== null) ? { status: 'draw' } : { status: 'in-progress' };
}

export function createGame(): GameState {
  return {
    board: Array(CELL_COUNT).fill(null),
    currentPlayer: 'X',
    status: 'in-progress',
  };
}

export function playMove(state: GameState, index: number): GameState {
  if (
    state.status !== 'in-progress' ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= CELL_COUNT ||
    state.board[index] !== null
  ) {
    return state;
  }

  const board = state.board.map((cell, cellIndex) =>
    cellIndex === index ? state.currentPlayer : cell,
  );
  const evaluation = evaluateBoard(board);
  const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

  return {
    board,
    currentPlayer: evaluation.status === 'in-progress' ? nextPlayer : state.currentPlayer,
    ...evaluation,
  };
}
