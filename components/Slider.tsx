import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step: number;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
  thumbTintColor: string;
}

export default function CustomSlider(props: SliderProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <input
          type="range"
          min={props.minimumValue}
          max={props.maximumValue}
          step={props.step}
          value={props.value}
          onChange={(e) => props.onValueChange(Number(e.target.value))}
          style={{
            width: '100%',
            height: 40,
            WebkitAppearance: 'none',
            background: 'transparent',
          }}
          className="slider"
        />
        <style>
          {`
            .slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${props.thumbTintColor};
              cursor: pointer;
              margin-top: -8px;
            }
            .slider::-webkit-slider-runnable-track {
              width: 100%;
              height: 4px;
              background: ${props.maximumTrackTintColor};
              border-radius: 2px;
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${props.thumbTintColor};
              cursor: pointer;
              border: none;
            }
            .slider::-moz-range-track {
              width: 100%;
              height: 4px;
              background: ${props.maximumTrackTintColor};
              border-radius: 2px;
            }
            .slider::-ms-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${props.thumbTintColor};
              cursor: pointer;
            }
            .slider::-ms-track {
              width: 100%;
              height: 4px;
              background: ${props.maximumTrackTintColor};
              border-radius: 2px;
            }
          `}
        </style>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Slider
        {...props}
        style={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});