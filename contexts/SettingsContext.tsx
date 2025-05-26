import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

interface SettingsContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  aiDifficulty: number;
  setAiDifficulty: (difficulty: number) => void;
  playSound: (soundType: 'place' | 'remove' | 'win') => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [aiDifficulty, setAiDifficulty] = useState(1); // 0: Easy, 1: Medium, 2: Hard
  const [sounds, setSounds] = useState<{ [key: string]: Audio.Sound | null }>({});

  useEffect(() => {
    // Load sounds when component mounts
    const loadSounds = async () => {
      try {
        const soundMap = {
          place: require('@/assets/sounds/place.mp3'),
          remove: require('@/assets/sounds/remove.mp3'),
          win: require('@/assets/sounds/win.mp3'),
        };

        const loadedSounds: { [key: string]: Audio.Sound | null } = {};
        for (const [type, source] of Object.entries(soundMap)) {
          try {
            const { sound } = await Audio.Sound.createAsync(source);
            loadedSounds[type] = sound;
          } catch (error) {
            console.log(`Error loading sound ${type}:`, error);
            loadedSounds[type] = null;
          }
        }
        setSounds(loadedSounds);
      } catch (error) {
        console.log('Error loading sounds:', error);
      }
    };

    loadSounds();

    // Cleanup sounds when component unmounts
    return () => {
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  const playSound = async (soundType: 'place' | 'remove' | 'win') => {
    if (!soundEnabled) return;

    try {
      const sound = sounds[soundType];
      if (sound) {
        await sound.setVolumeAsync(volume);
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        volume,
        setVolume,
        aiDifficulty,
        setAiDifficulty,
        playSound,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}