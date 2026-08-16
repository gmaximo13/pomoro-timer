import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { Home } from './pages/Home';
import { useEffect } from 'react';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Home />
    </View>
  );
}

