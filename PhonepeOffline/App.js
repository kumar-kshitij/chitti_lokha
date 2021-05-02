import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ReceiveScreen from './src/screens/ReceiveScreen';
import SendScreen from './src/screens/SendScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import { THEME } from './src/constants';
import { View, StatusBar, Alert, AsyncStorage } from 'react-native';
import SessionContext from './src/SessionContext';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const initialState = {
  walletBalance: 0,
  pendingTransactions: [],
  isInternetReachable: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'update_wallet':
      return { ...state, walletBalance: state.walletBalance + action.payload };
    case 'insert_transaction':
      return { ...state, pendingTransactions: [action.payload, ...state.pendingTransactions] };
    // case 'delete_transaction':
    //   return { ...state, pendingTransactions: state.pendingTransactions.filter(t => t.id !== action.payload) };
    case 'toggle_connectivity':
      return { ...state, isInternetReachable: action.payload };
    default:
      throw new Error();
  }
}

const navigationRef = React.createRef();
const STORAGE_KEY = 'PHONEPE_OFFLINE_STATE';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadState() {
    try {
      let localState = await AsyncStorage.getItem(STORAGE_KEY);
      if (localState === null) return;
      localState = JSON.parse(localState);
      dispatch({ type: 'update_wallet', payload: localState.walletBalance });
      localState.pendingTransactions.forEach(t => {
        dispatch({ type: 'insert_transaction', payload: t });
      });
    } catch (e) {
      // console.error('Failed to load state.')
    }
  }

  async function saveState(s) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ walletBalance: s.walletBalance, pendingTransactions: s.pendingTransactions }));
    } catch (e) {
      // console.error('Failed to save state.')
    }
  }

  useEffect(() => {
    loadState();
    const removeNetInfoSubscription = NetInfo.addEventListener((s) => {
      dispatch({ type: 'toggle_connectivity', payload: s.isConnected && s.isInternetReachable });
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    saveState(JSON.parse(JSON.stringify(state)));
  }, [state]);

  useEffect(() => {
    if (state.isInternetReachable) {
      let totalTransactions = state.pendingTransactions.filter(t => t.amount < 0).length;
      if (totalTransactions > 0) {
        Alert.alert(
          'You are online!',
          `You have ${totalTransactions} pending transaction(s). Click Proceed to complete them.`,
          [
            { text: "Later", style: "cancel" },
            { text: "Proceed", onPress: () => navigationRef.current?.navigate('Pending Transactions') }
          ],
          { cancelable: true }
        );
      }
    }
  }, [state.isInternetReachable]);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="light-content" backgroundColor={THEME.primaryColor} />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: THEME.primaryColor
            },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="Phonepe Offline" component={HomeScreen} />
            <Stack.Screen name="Receive Money" component={ReceiveScreen} />
            <Stack.Screen name="Send Money" component={SendScreen} />
            <Stack.Screen name="Pending Transactions" component={TransactionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SessionContext.Provider>
  );
}
