import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, EvilIcons, Foundation, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
        <Tabs.Screen
        name="members"
        options={{
          title: 'Members',
          tabBarIcon: ({ color }) =><MaterialIcons name="group" size={30} color="gray" />,
        }}
      />
      <Tabs.Screen  
        name="plan"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color }) => <Foundation name="clipboard-notes" size={30} color="gray" />,
        }}
      />
        <Tabs.Screen  
        name="transaction"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <MaterialIcons name="payment" size={30} color="gray" />,
        }}
      />
        <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <EvilIcons name="chart" size={30} color="gray" />,
        }}
      />
    </Tabs>
  );
}
