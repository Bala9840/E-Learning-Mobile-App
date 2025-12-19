import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/AuthContext';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { QuizProvider } from '@/context/QuizContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/context/ThemeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';

export default function RootLayout() {
  return (
    <AnimatedSplashScreen>
      <CustomThemeProvider>
        <RootLayoutNav />
      </CustomThemeProvider>
    </AnimatedSplashScreen>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <QuizProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </QuizProvider>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
