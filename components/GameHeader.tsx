import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/GameContext';
import { X, Circle } from 'lucide-react-native';

export default function GameHeader() {
  const { playerScore, aiScore } = useGame();
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tic Tac Toe 2.0</Text>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreItem}>
          <X size={20} color="#7B68EE" />
          <Text style={styles.scoreValue}>{playerScore}</Text>
        </View>
        <View style={[styles.scoreItem, styles.aiScore]}>
          <Circle size={20} color="#FF6B6B" />
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  aiScore: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
    fontFamily: 'Poppins-Bold',
  },
});