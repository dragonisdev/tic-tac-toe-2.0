import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '@/contexts/GameContext';
import BackgroundPattern from './BackgroundPattern';

interface BackgroundGradientProps {
  children: React.ReactNode;
}

export default function BackgroundGradient({ children }: BackgroundGradientProps) {
  const { isOverTheBoard } = useGame();
  
  const getGradientColors = (): [string, string, string] => {
    if (isOverTheBoard) {
      // Warm, competitive colors for 2-player mode
      return ['#2D1B69', '#1E293B', '#0F172A'];
    } else {
      // Cool, tech-inspired colors for AI mode
      return ['#1E293B', '#0F172A', '#020617'];
    }
  };
  
  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <BackgroundPattern />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
}); 