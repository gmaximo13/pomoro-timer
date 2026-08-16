import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationProp, DefaultTheme } from '@react-navigation/native';

import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Theme } from './shared/themes/Theme';

type TScreenDefinitions = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
  return (
    <NavigationContainer
    theme={{
      ...DefaultTheme,
      fonts: {
      ...DefaultTheme.fonts,
        bold: {
          fontWeight: '700',
          fontFamily: Theme.fonts.InterBold,
        },
        regular: {
          fontWeight: '400',
          fontFamily: Theme.fonts.InterRegular,
        },
      },
      colors: {
        ...DefaultTheme.colors,
        primary: Theme.colors.primary,
        background: Theme.colors.background,
        text: Theme.colors.text,
      },
    }}
    >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TScreenDefinitionsProps = NavigationProp<TScreenDefinitions>;