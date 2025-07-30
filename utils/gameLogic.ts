import type { BoardState, CellValue } from '@/types/game';

export function checkWinner(board: BoardState, player: CellValue): number[] | null {
  const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];
  
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return pattern;
    }
  }
  
  return null;
}

export function getAIMove(board: BoardState, playerMoves: number[], difficulty: number = 1): number | null {
  console.log('AI difficulty:', difficulty);
  const emptyCells = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
  
  if (emptyCells.length === 0) {
    return null;
  }

  // Easy mode: Random moves only
  if (difficulty === 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  
  // Medium mode: Basic strategy (block wins, prefer center)
  if (difficulty === 1) {
    // First priority: Block player from winning
    const blockingMove = findWinningMove(board, 'X');
    if (blockingMove !== null) {
      return blockingMove;
    }
    
    // Second priority: Center
    if (board[4] === null) {
      return 4;
    }
    
    // Third priority: Random move
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  
  // Hard mode: Advanced strategy
  if (difficulty === 2) {
    // First priority: Try to win
    const winningMove = findWinningMove(board, 'O');
    if (winningMove !== null) {
      return winningMove;
    }
    
    // Second priority: Block player from winning
    const blockingMove = findWinningMove(board, 'X');
    if (blockingMove !== null) {
      return blockingMove;
    }
    
    // Third priority: Center
    if (board[4] === null) {
      return 4;
    }
    
    // Fourth priority: Corners (strategic positions)
    const corners = [0, 2, 6, 8].filter(index => board[index] === null);
    if (corners.length > 0) {
      return corners[0];
    }
    
    // Fifth priority: Edges
    const edges = [1, 3, 5, 7].filter(index => board[index] === null);
    if (edges.length > 0) {
      return edges[0];
    }
  }
  
  // Fallback: Random move
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function findWinningMove(board: BoardState, player: CellValue): number | null {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cells = [board[a], board[b], board[c]];
    const playerCells = cells.filter(cell => cell === player).length;
    const emptyCells = cells.filter(cell => cell === null).length;
    
    if (playerCells === 2 && emptyCells === 1) {
      // Find the empty position and return it
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  
  return null;
}