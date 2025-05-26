import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useGame } from '@/contexts/GameContext';
import CustomSlider from './Slider';

export default function GameSettings() {
  const { 
    isOverTheBoard,
    setIsOverTheBoard,
    boardSize,
    setBoardSize,
    winLength,
    setWinLength,
    resetGame
  } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Game Mode</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Over the Board</Text>
          <Switch
            value={isOverTheBoard}
            onValueChange={setIsOverTheBoard}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isOverTheBoard ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Board Size</Text>
        <CustomSlider
          value={boardSize}
          onValueChange={setBoardSize}
          minimumValue={3}
          maximumValue={5}
          step={1}
          minimumTrackTintColor="#81b0ff"
          maximumTrackTintColor="#767577"
          thumbTintColor="#f5dd4b"
        />
        <Text style={styles.value}>{boardSize}x{boardSize}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Win Length</Text>
        <CustomSlider
          value={winLength}
          onValueChange={setWinLength}
          minimumValue={3}
          maximumValue={boardSize}
          step={1}
          minimumTrackTintColor="#81b0ff"
          maximumTrackTintColor="#767577"
          thumbTintColor="#f5dd4b"
        />
        <Text style={styles.value}>{winLength} in a row</Text>
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