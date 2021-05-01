import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RecieveScreen from './src/screens/RecieveScreen';
import SendScreen from './src/screens/SendScreen';
import TransactionsScreen from './src/screens/TransactionsScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Phonepe Offline" component={HomeScreen} />
        <Stack.Screen name="Recieve Money" component={RecieveScreen} />
        <Stack.Screen name="Send Money" component={SendScreen} />
        <Stack.Screen name="Pending Transactions" component={TransactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
