import React from 'react';
import { View, Text, StyleSheet, Switch, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';
import CustomSlider from '@/components/Slider';
import { X, Circle } from 'lucide-react-native';

export default function SettingsScreen() {
  const { 
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
    aiDifficulty,
    setAiDifficulty
  } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>AI Difficulty</Text>
            <View style={styles.sliderContainer}>
              <CustomSlider
                value={aiDifficulty}
                onValueChange={setAiDifficulty}
                minimumValue={0}
                maximumValue={2}
                step={1}
                minimumTrackTintColor="#7B68EE"
                maximumTrackTintColor="#767577"
                thumbTintColor="#A78BFF"
              />
              <Text style={styles.difficultyLabel}>
                {aiDifficulty === 0 ? 'Easy' : aiDifficulty === 1 ? 'Medium' : 'Hard'}
              </Text>
            </View>
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#7B68EE' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : soundEnabled ? '#A78BFF' : '#f4f3f4'}
            />
          </View>
          
          {soundEnabled && (
            <View style={styles.setting}>
              <Text style={styles.settingLabel}>Volume</Text>
              <View style={styles.sliderContainer}>
                <CustomSlider
                  value={volume}
                  onValueChange={setVolume}
                  minimumValue={0}
                  maximumValue={1}
                  step={0.1}
                  minimumTrackTintColor="#7B68EE"
                  maximumTrackTintColor="#767577"
                  thumbTintColor="#A78BFF"
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>1</Text>
            <Text style={styles.ruleText}>
              You play as <X size={18} color="#7B68EE" style={styles.inlineIcon} /> and your goal is to connect 3 marks in a row
              (horizontal, vertical, or diagonal) to win.
            </Text>
          </View>
          
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>2</Text>
            <Text style={styles.ruleText}>
              The opponent plays as <Circle size={18} color="#FF6B6B" style={styles.inlineIcon} /> and follows the same rules.
            </Text>
          </View>
          
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>3</Text>
            <Text style={styles.ruleText}>
              Both players can have a maximum of 3 symbols on the board at any time.
            </Text>
          </View>
          
          <View style={styles.rule}>
            <Text style={styles.ruleNumber}>4</Text>
            <Text style={styles.ruleText}>
              When you place a 4th mark, your oldest mark is automatically removed.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strategy Tips</Text>
          <Text style={styles.tipText}>
            • Think ahead! Consider which of your marks will disappear next.
          </Text>
          <Text style={styles.tipText}>
            • Try to set up multiple potential winning lines simultaneously.
          </Text>
          <Text style={styles.tipText}>
            • Watch your opponent's moves carefully to block potential wins.
          </Text>
          <Text style={styles.tipText}>
            • Use the sliding mechanic strategically in Over the Board mode!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === 'web' ? 48 : 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
    fontFamily: 'Poppins-Bold',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 20,
  },
  difficultyLabel: {
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins-Medium',
  },
  rule: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  ruleNumber: {
    backgroundColor: '#7B68EE',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginRight: 12,
    overflow: 'hidden',
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Bold',
  },
  ruleText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  inlineIcon: {
    marginHorizontal: 4,
  },
  tipText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
});