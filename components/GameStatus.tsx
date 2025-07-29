import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSequence, 
  withTiming,
  withRepeat
} from 'react-native-reanimated';
import { X, Circle } from 'lucide-react-native';
import { useGame } from '@/contexts/GameContext';
import { getResponsiveFontSize, getResponsiveIconSize } from '@/utils/responsiveText';

export default function GameStatus() {
  const { playerTurn, playerMoves, aiMoves, gameState, winningLine, isOverTheBoard } = useGame();
  const scaleAnim = useSharedValue(1);
  const winScale = useSharedValue(1);
  
  useEffect(() => {
    if (gameState === 'playerWin' || gameState === 'aiWin') {
      winScale.value = withSequence(
        withTiming(1.1, { duration: 300 }),
        withTiming(1, { duration: 300 }),
        withTiming(1.1, { duration: 300 }),
        withTiming(1, { duration: 300 })
      );
    } else {
      winScale.value = 1;
    }
  }, [gameState]);
  
  useEffect(() => {
    if (playerTurn) {
      scaleAnim.value = withSequence(
        withTiming(1.05, { duration: 600 }),
        withTiming(1, { duration: 600 })
      );
    }
  }, [playerTurn]);
  
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }]
    };
  });
  
  const winAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: winScale.value }]
    };
  });
  
  const renderNextToRemoveIndicator = () => {
    const currentMoves = playerTurn ? playerMoves : aiMoves;
    const symbol = playerTurn ? <X size={getResponsiveIconSize(20, 28)} color="#7B68EE" /> : <Circle size={getResponsiveIconSize(20, 28)} color="#FF6B6B" />;
    
    if (currentMoves.length >= 3) {
      return (
        <View style={styles.nextRemoveContainer}>
          <Text style={styles.nextRemoveText}>Next removal:</Text>
          <View style={styles.iconContainer}>
            {symbol}
            <Text style={styles.positionText}>Position {currentMoves[0] + 1}</Text>
          </View>
        </View>
      );
    }
    
    return null;
  };
  
  const renderContent = () => {
    if (gameState === 'playerWin' || gameState === 'aiWin') {
      const isPlayerWin = gameState === 'playerWin';
      const winText = isOverTheBoard 
        ? (isPlayerWin ? 'Player X Wins!' : 'Player O Wins!') 
        : (isPlayerWin ? 'You Win!' : 'AI Wins!');
      
      return (
        <Animated.View style={[styles.statusContent, winAnimatedStyle]}>
          <Text style={[styles.winText, isPlayerWin ? styles.playerWinText : styles.aiWinText]}>
            {winText}
          </Text>
          <Text style={styles.subText}>The board will reset shortly</Text>
        </Animated.View>
      );
    }
    
    return (
      <View style={styles.statusContent}>
        <Animated.View style={animatedTextStyle}>
          <Text style={styles.turnText}>
            {isOverTheBoard 
              ? (playerTurn ? 'Player X Turn' : 'Player O Turn')
              : (playerTurn ? 'Your Turn' : 'AI Thinking...')}
          </Text>
        </Animated.View>
        
        <View style={styles.moveCountContainer}>
          <View style={styles.moveCount}>
            <X size={getResponsiveIconSize(18, 24)} color="#7B68EE" />
            <Text style={styles.countText}>{playerMoves.length}/3</Text>
          </View>
          <View style={styles.moveCount}>
            <Circle size={getResponsiveIconSize(18, 24)} color="#FF6B6B" />
            <Text style={styles.countText}>{aiMoves.length}/3</Text>
          </View>
        </View>
        
        
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  statusContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 12,
  },
  turnText: {
    fontSize: getResponsiveFontSize(20, 28),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  moveCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  moveCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    color: 'white',
    marginLeft: 8,
    fontSize: getResponsiveFontSize(16, 20),
    fontFamily: 'Poppins-Medium',
  },
  nextRemoveContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 10,
  },
  nextRemoveText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: getResponsiveFontSize(14, 18),
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionText: {
    color: 'white',
    marginLeft: 8,
    fontSize: getResponsiveFontSize(14, 18),
    fontFamily: 'Poppins-Regular',
  },
  winText: {
    fontSize: getResponsiveFontSize(24, 32),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  playerWinText: {
    color: '#A78BFF',
  },
  aiWinText: {
    color: '#FF8E8E',
  },
  subText: {
    fontSize: getResponsiveFontSize(14, 18),
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
});