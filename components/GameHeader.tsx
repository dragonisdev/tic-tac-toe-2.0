import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/GameContext';
import { X, Circle } from 'lucide-react-native';
import { getResponsiveFontSize, getResponsiveIconSize } from '@/utils/responsiveText';

export default function GameHeader() {
  const { playerScore, aiScore, isOverTheBoard } = useGame();
  
  const getGameModeText = () => {
    return isOverTheBoard ? 'Over the Board' : 'AI Opponent';
  };
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{getGameModeText()}</Text>
      
      <View style={styles.scoreContainer}>
        <View style={styles.scoreItem}>
          <X size={getResponsiveIconSize(16, 24)} color="#7B68EE" />
          <Text style={styles.scoreValue}>{playerScore}</Text>
        </View>
        <View style={[styles.scoreItem, styles.aiScore]}>
          <Circle size={getResponsiveIconSize(16, 24)} color="#FF6B6B" />
          <Text style={styles.scoreValue}>{aiScore}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 14,
  },
  title: {
    fontSize: getResponsiveFontSize(28, 36),
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  aiScore: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreValue: {
    fontSize: getResponsiveFontSize(16, 22),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 6,
    fontFamily: 'Poppins-Bold',
  },
});