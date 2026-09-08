import './style.css';
import { CELL_COUNT, createGame, playMove } from './game';

function initialiseGame(): void {
  const root = document.getElementById('app');
  if (!root) throw new Error('Missing #app element.');

  const boardElement = document.getElementById('board');
  const statusElement = document.getElementById('status');
  const restartButton = document.getElementById('restart');
  if (!boardElement || !statusElement || !restartButton) {
    throw new Error('elements missing');
  }
  const restart = restartButton;
  const status = statusElement;

  let state = createGame();

  const cells = Array.from({ length: CELL_COUNT }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cell';
    button.addEventListener('click', () => {
      const nextState = playMove(state, index);
      if (nextState === state) return;

      state = nextState;
      render();
    });
    boardElement.append(button);
    return button;
  });

  restart.addEventListener('click', () => {
    state = createGame();
    render();
    cells[0]?.focus();
  });

  function render(): void {
    const { board, currentPlayer, status: gameStatus, winner, winningLine } = state;
    const gameOver = gameStatus !== 'in-progress';

    for (const [index, button] of cells.entries()) {
      const mark = board[index] ?? null;
      button.textContent = mark ?? '';
      button.dataset.player = mark ?? ''; // .cell[data-player='X'] 
      button.classList.toggle('win', winningLine?.includes(index) ?? false);
      button.disabled = mark !== null || gameOver;
    }

    status.classList.toggle('end', gameOver);
    switch (gameStatus) {
      case 'won':
        status.textContent = `Player ${winner} wins!`;
        break;
      case 'draw':
        status.textContent = "It's a draw.";
        break;
      case 'in-progress':
        status.textContent = `Player ${currentPlayer} to move`;
        break;
    }
  }

  render();
}

initialiseGame();
