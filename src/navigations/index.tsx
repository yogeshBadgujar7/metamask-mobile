import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import WalletConnectScreen from '../screens/walletConnect';
import HomeScreen from '../screens/homeScreen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalletConnect">
      <Stack.Screen
          name="WalletConnect"
          component={WalletConnectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations