import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkWinner, getAIMove } from '@/utils/gameLogic';
import type { BoardState, CellValue, GameContextType, GameState } from '@/types/game';
import { useSettings } from '@/contexts/SettingsContext';

const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

interface GameProviderProps {
  children: React.ReactNode;
  isOverTheBoard?: boolean;
}

export function GameProvider({ children, isOverTheBoard = false }: GameProviderProps) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerMoves, setPlayerMoves] = useState<number[]>([]);
  const [aiMoves, setAiMoves] = useState<number[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isAITurning, setIsAITurning] = useState(false);
  const { playSound, aiDifficulty } = useSettings();
  
  // Ensure game state is properly initialized
  useEffect(() => {
    // Reset any stuck states when component mounts
    if (isAITurning) {
      setIsAITurning(false);
    }
    if (gameState !== 'playing') {
      setGameState('playing');
    }
  }, []);
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerMoves([]);
    setAiMoves([]);
    setPlayerTurn(true);
    setGameState('playing');
    setWinningLine(null);
  };
  
  const handleCellPress = async (index: number) => {
    if (board[index] !== null || gameState !== 'playing' || isAITurning) return;
    
    const newBoard = [...board];
    const currentPlayer = isOverTheBoard ? (playerTurn ? 'X' : 'O') : 'X';
    const currentMoves = isOverTheBoard ? (playerTurn ? playerMoves : aiMoves) : playerMoves;
    
    newBoard[index] = currentPlayer;
    let newCurrentMoves = [...currentMoves, index];
    
    if (newCurrentMoves.length > 3) {
      const oldestMove = newCurrentMoves.shift();
      if (oldestMove !== undefined) {
        newBoard[oldestMove] = null;
        await playSound('remove');
      }
    } else {
      await playSound('place');
    }
    
    setBoard(newBoard);
    if (isOverTheBoard) {
      if (playerTurn) {
        setPlayerMoves(newCurrentMoves);
      } else {
        setAiMoves(newCurrentMoves);
      }
    } else {
      setPlayerMoves(newCurrentMoves);
    }
    
    const winResult = checkWinner(newBoard, currentPlayer);
    if (winResult) {
      setGameState(isOverTheBoard ? (playerTurn ? 'playerWin' : 'aiWin') : 'playerWin');
      if (isOverTheBoard) {
        if (playerTurn) {
          setPlayerScore(prev => prev + 1);
        } else {
          setAiScore(prev => prev + 1);
        }
      } else {
        setPlayerScore(prev => prev + 1);
      }
      setWinningLine(winResult);
      await playSound('win');
      
      setTimeout(() => {
        resetGame();
      }, 2000);
      
      return;
    }
    
    if (isOverTheBoard) {
      setPlayerTurn(!playerTurn);
    } else {
      setPlayerTurn(false);
      setIsAITurning(true);
      setTimeout(() => {
        makeAIMove(newBoard, newCurrentMoves, aiMoves);
      }, 500);
    }
  };
  
  const makeAIMove = async (currentBoard: BoardState, currentPlayerMoves: number[], currentAiMoves: number[]) => {
    if (gameState !== 'playing') return;
    
    const aiMoveIndex = getAIMove(currentBoard, currentPlayerMoves, aiDifficulty);
    
    if (aiMoveIndex !== null) {
      const newBoard = [...currentBoard];
      newBoard[aiMoveIndex] = 'O';
      
      let newAiMoves = [...currentAiMoves, aiMoveIndex];
      
      if (newAiMoves.length > 3) {
        const oldestMove = newAiMoves.shift();
        if (oldestMove !== undefined) {
          newBoard[oldestMove] = null;
          await playSound('remove');
        }
      } else {
        await playSound('place');
      }
      
      setBoard(newBoard);
      setAiMoves(newAiMoves);
      
      const aiWinResult = checkWinner(newBoard, 'O');
      if (aiWinResult) {
        setGameState('aiWin');
        setAiScore(prev => prev + 1);
        setWinningLine(aiWinResult);
        setIsAITurning(false);
        await playSound('win');
        
        setTimeout(() => {
          resetGame();
        }, 2000);
        
        return;
      }
      
      setPlayerTurn(true);
      setIsAITurning(false);
    } else {
      setPlayerTurn(true);
      setIsAITurning(false);
    }
  };
  
  return (
    <GameContext.Provider
      value={{
        board,
        playerTurn,
        handleCellPress,
        playerScore,
        aiScore,
        playerMoves,
        aiMoves,
        gameState,
        winningLine,
        resetGame,
        isOverTheBoard,
        isAITurning
      }}
    >
      {children}
    </GameContext.Provider>
  );
}