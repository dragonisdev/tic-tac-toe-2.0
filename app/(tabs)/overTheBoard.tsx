import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import GameBoard from '@/components/GameBoard';
import GameHeader from '@/components/GameHeader';
import GameStatus from '@/components/GameStatus';
import BackgroundGradient from '@/components/BackgroundGradient';
import { GameProvider } from '@/contexts/GameContext';

export default function OverTheBoardScreen() {
  return (
    <GameProvider isOverTheBoard={true}>
      <BackgroundGradient>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <GameHeader />
            <GameBoard />
            <GameStatus />
          </View>
        </SafeAreaView>
      </BackgroundGradient>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'web' ? 48 : 0
  },
});