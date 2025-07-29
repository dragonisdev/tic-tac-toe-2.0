export type CellValue = 'X' | 'O' | null;
export type BoardState = CellValue[];
export type GameState = 'playing' | 'playerWin' | 'aiWin' | 'draw';

export interface GameContextType {
  board: BoardState;
  playerTurn: boolean;
  handleCellPress: (index: number) => void;
  playerScore: number;
  aiScore: number;
  playerMoves: number[];
  aiMoves: number[];
  gameState: GameState;
  winningLine: number[] | null;
  resetGame: () => void;
  isOverTheBoard: boolean;
  isAITurning: boolean;
}