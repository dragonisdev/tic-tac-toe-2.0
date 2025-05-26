import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { SettingsProvider } from '@/contexts/SettingsContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  
  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf',
    'Poppins-Bold': 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1s.ttf',
    'Poppins-Medium': 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1s.ttf',
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}