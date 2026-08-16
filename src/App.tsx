import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppRoutes } from './AppRoutes';
import { Theme } from './shared/themes/Theme';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

export function App() {
  const [loaded, error] = useFonts({
    'InterBold': Inter_700Bold,
    'InterRegular': Inter_400Regular
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
      return null;
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <StatusBar style="light" />

      <AppRoutes />
    </SafeAreaView>
  );
}

