import { Tabs } from 'expo-router';
import { Users as PvP, Bot, Settings2 as Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7B68EE',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F5F5F5',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="game"
        options={{
          title: 'AI Opponent',
          tabBarIcon: ({ color, size }) => (
            <Bot size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="overTheBoard"
        options={{
          title: 'Over the Board',
          tabBarIcon: ({ color, size }) => (
            <PvP size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}