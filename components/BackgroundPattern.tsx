import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGame } from '@/contexts/GameContext';

export default function BackgroundPattern() {
  const { isOverTheBoard } = useGame();
  
  return (
    <View style={styles.container}>
    
      
      
      {/* Floating particles */}
      <View style={styles.particlesContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.particle,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: isOverTheBoard ? 0.3 : 0.2,
                backgroundColor: isOverTheBoard ? '#7B68EE' : '#4F46E5',
              }
            ]} 
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    width: 1,
    height: '100%',
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
}); 