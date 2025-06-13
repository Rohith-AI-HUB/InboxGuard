import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SpamScreen from '../screens/SpamScreen';

import ArchiveScreen from '../screens/ArchiveScreen';
import DeletedScreen from '../screens/DeletedScreen';
import MessageDetails from '../screens/MessageDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<string, "mail" | "alert-circle" | "archive" | "trash"> = {
          Inbox: 'mail',
          Spam: 'alert-circle',
          Archive: 'archive',
          Deleted: 'trash',
        };
        return <Ionicons name={iconMap[route.name] as "mail" | "alert-circle" | "archive" | "trash" || 'mail'} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Inbox" component={HomeScreen} />
    <Tab.Screen name="Spam" component={SpamScreen} />
    <Tab.Screen name="Archive" component={ArchiveScreen} />
    <Tab.Screen name="Deleted" component={DeletedScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MessageDetails" component={MessageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



