import React from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import { X, Circle } from 'lucide-react-native';
import { useGame } from '@/contexts/GameContext';
import Cell from '@/components/Cell';

const { width, height } = Dimensions.get('window');
const BOARD_PADDING = 24;
const screenDiagonal = Math.sqrt(width * width + height * height);
const isTablet = screenDiagonal > 1000; // Rough threshold for tablets

// Responsive sizing based on device type
const MIN_BOARD_SIZE = isTablet ? 400 : 280;
const MAX_BOARD_SIZE = Math.min(width, height) - BOARD_PADDING * 2;
const BOARD_SIZE = Math.max(MIN_BOARD_SIZE, Math.min(MAX_BOARD_SIZE, isTablet ? 600 : 400));
const CELL_SIZE = (BOARD_SIZE - 16) / 3;

export default function GameBoard() {
  const { 
    board, 
    handleCellPress, 
    playerTurn,
    winningLine,
    isOverTheBoard,
    gameState
  } = useGame();
  
  const boardScale = useSharedValue(1);
  
  const handlePress = (index: number) => {
    // Only check if the cell is empty and game is in playing state
    if (board[index] !== null || gameState !== 'playing') return;
    
    boardScale.value = withSequence(
      withTiming(0.98, { duration: 50 }),
      withTiming(1, { duration: 100 })
    );
    
    handleCellPress(index);
  };
  
  const boardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: boardScale.value }]
    };
  });
  
  return (
    <Animated.View style={[styles.boardContainer, boardAnimatedStyle]}>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            index={index}
            onPress={() => handlePress(index)}
            isWinningCell={winningLine?.includes(index) || false}
          />
        ))}
        
        {/* Grid lines */}
        <View style={[styles.line, styles.horizontalLine1]} />
        <View style={[styles.line, styles.horizontalLine2]} />
        <View style={[styles.line, styles.verticalLine1]} />
        <View style={[styles.line, styles.verticalLine2]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: BOARD_PADDING,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'rwrap',
    padding: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  horizontalLine1: {
    top: CELL_SIZE + 8,
    left: 8,
    right: 8,
    height: 1,
  },
  horizontalLine2: {
    top: CELL_SIZE * 2 + 8,
    left: 8,
    right: 8,
    height: 1,
  },
  verticalLine1: {
    top: 8,
    bottom: 8,
    left: CELL_SIZE + 8,
    width: 1,
  },
  verticalLine2: {
    top: 8,
    bottom: 8,
    left: CELL_SIZE * 2 + 8,
    width: 1,
  },
});