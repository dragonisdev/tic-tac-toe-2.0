import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { X, Circle } from 'lucide-react-native';
import { CellValue } from '@/types/game';
import { useGame } from '@/contexts/GameContext';

const { width, height } = Dimensions.get('window');
const BOARD_PADDING = 24;
const screenDiagonal = Math.sqrt(width * width + height * height);
const isTablet = screenDiagonal > 1000; // Rough threshold for tablets

// Responsive sizing based on device type
const MIN_BOARD_SIZE = isTablet ? 400 : 280;
const MAX_BOARD_SIZE = Math.min(width, height) - BOARD_PADDING * 2;
const BOARD_SIZE = Math.max(MIN_BOARD_SIZE, Math.min(MAX_BOARD_SIZE, isTablet ? 600 : 400));
const CELL_SIZE = (BOARD_SIZE - 16) / 3;

interface CellProps {
  value: CellValue;
  index: number;
  onPress: () => void;
  isWinningCell: boolean;
}

export default function Cell({ value, index, onPress, isWinningCell }: CellProps) {
  const { playerTurn, playerMoves, aiMoves, isOverTheBoard } = useGame();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const glow = useSharedValue(1);
  const winningPulse = useSharedValue(1);
  const rotation = useSharedValue(0);
  const isAboutToDisappear = useSharedValue(false);
  
  useEffect(() => {
    if (value === null) {
      isAboutToDisappear.value = false;
    } else {
      const currentMoves = isOverTheBoard
        ? (value === 'X' ? playerMoves : aiMoves)
        : (value === 'X' ? playerMoves : aiMoves);
      isAboutToDisappear.value = currentMoves.length === 3 && currentMoves[0] === index;
    }
  }, [value, playerMoves, aiMoves, index, isOverTheBoard]);
  
  useEffect(() => {
    if (value !== null) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSequence(
        withTiming(1.2, { duration: 150, easing: Easing.out(Easing.back()) }),
        withTiming(1, { duration: 100 })
      );
      
      if (isAboutToDisappear.value) {
        glow.value = withRepeat(
          withSequence(
            withTiming(1.2, { duration: 1000 }),
            withTiming(1, { duration: 1000 })
          ),
          -1,
          true
        );
      } else {
        glow.value = 1;
      }
    } else {
      opacity.value = 0;
      scale.value = 0;
      glow.value = 1;
    }
  }, [value, playerMoves, aiMoves]);
  
  useEffect(() => {
    if (isWinningCell) {
      winningPulse.value = withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 300 }),
        withDelay(100, withSequence(
          withTiming(1.2, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ))
      );
      rotation.value = withSequence(
        withTiming(360, { 
          duration: 600,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        withTiming(0, { duration: 0 })
      );
    } else {
      winningPulse.value = 1;
      rotation.value = 0;
    }
  }, [isWinningCell]);
  
  const cellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value,
    };
  });
  
  const glowAnimatedStyle = useAnimatedStyle(() => {
    const shadowColor = value === 'X' ? '#7B68EE' : '#FF6B6B';
    const shadowStyle = isAboutToDisappear.value ? {
      ...(Platform.OS === 'ios' ? {
        shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      } : {
        elevation: 5,
      })
    } : {};
    
    return {
      transform: [{ scale: glow.value }],
      ...shadowStyle
    };
  });
  
  const winningAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isWinningCell ? winningPulse.value : 1 }],
    };
  });
  
  const row = Math.floor(index / 3);
  const col = index % 3;
  
  return (
    <Pressable
      style={[
        styles.cell,
        {
          top: row * CELL_SIZE,
          left: col * CELL_SIZE,
        }
      ]}
      onPress={onPress}
      hitSlop={5}
    >
      <Animated.View style={[styles.cellContent, winningAnimatedStyle, glowAnimatedStyle]}>
        {value === 'X' && (
          <Animated.View style={cellAnimatedStyle}>
            <X 
              size={CELL_SIZE * 0.5} 
              color={isWinningCell ? '#A78BFF' : '#7B68EE'} 
              strokeWidth={3} 
            />
          </Animated.View>
        )}
        {value === 'O' && (
          <Animated.View style={cellAnimatedStyle}>
            <Circle 
              size={CELL_SIZE * 0.5} 
              color={isWinningCell ? '#FF8E8E' : '#FF6B6B'} 
              strokeWidth={3} 
            />
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});