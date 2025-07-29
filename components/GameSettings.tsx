import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGame } from '@/contexts/GameContext';

export default function GameSettings() {
  const { 
    isOverTheBoard,
    resetGame
  } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Game Mode</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {isOverTheBoard ? 'Over the Board Mode' : 'AI Opponent Mode'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Game Info</Text>
        <Text style={styles.value}>3x3 Board</Text>
        <Text style={styles.value}>3 in a row to win</Text>
      </View>

      <Pressable 
        style={styles.resetButton}
        onPress={resetGame}
      >
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
  },
  value: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  resetButton: {
    backgroundColor: '#f5dd4b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 