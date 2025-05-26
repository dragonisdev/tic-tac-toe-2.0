import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import GameBoard from '@/components/GameBoard';
import GameHeader from '@/components/GameHeader';
import GameStatus from '@/components/GameStatus';
import { GameProvider } from '@/contexts/GameContext';

export default function OverTheBoardScreen() {
  return (
    <GameProvider isOverTheBoard={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <GameHeader />
          <GameBoard />
          <GameStatus />
        </View>
      </SafeAreaView>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'web' ? 48 : 0
  },
});