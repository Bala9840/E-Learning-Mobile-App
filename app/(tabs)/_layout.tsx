import { Tabs } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const { user } = useAuth();

  const handleTabPress = (e: any) => {
    if (!user) {
      e.preventDefault();
      Alert.alert('Login Required', 'Please login to access this feature.');
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === 'dark' ? '#4ade80' : Colors['light'].tint,
        tabBarInactiveTintColor: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#666',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
          borderTopColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.2)' : '#e5e5e5',
          borderTopWidth: 1,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        listeners={{ tabPress: handleTabPress }}
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="task"
        listeners={{ tabPress: handleTabPress }}
        options={{
          title: 'Task',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet.rectangle.portrait.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        listeners={{ tabPress: handleTabPress }}
        options={{
          title: 'Ask AI',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fav"
        listeners={{ tabPress: handleTabPress }}
        options={{
          title: 'Fav',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{ tabPress: handleTabPress }}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
