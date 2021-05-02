import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import { THEME, MERCHANT_NAME, CREDIT_SCORE } from '../constants';
import SessionContext from '../SessionContext';
import { uuid } from '../utils';

export default function SendScreen() {
  const [view, setView] = useState(1);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const { state, dispatch } = useContext(SessionContext);
  const [isLoading, setLoading] = useState(false);

  const transaction_limit = state.walletBalance + CREDIT_SCORE * 10;

  function onChangeAmount(value) {
    if (Number(value) <= transaction_limit) {
      setAmount(Number(value));
    }
  }

  useEffect(() => {
    setTimeout(() => setView(2), 5000);
  }, []);

  return (
    <View style={styles.container}>
      {view === 1 ? <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>Searching for nearby merchants...</Text>
        <ActivityIndicator size="large" color={THEME.primaryColor} />
      </View> : null}
      {view === 2 ? <View>
        <Text style={{ padding: 20 }}>Select merchant to proceed for payment : </Text>
        <TouchableHighlight onPress={() => setView(3)}>
          <View style={styles.altButtonBody}>
            <Text style={styles.altButtonText}>{MERCHANT_NAME}</Text>
          </View>
        </TouchableHighlight>
      </View> : null}
      {view === 3 ? <View style={styles.innerContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>{MERCHANT_NAME}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10, fontSize: 16 }}>
          <Text>Offline Wallet Balance : </Text>
          <Text style={{ fontWeight: 'bold' }}>{state.walletBalance < 0 ? '- ' : ''}₹{Math.abs(state.walletBalance).toString()}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 30, fontSize: 16 }}>
          <Text>Transaction Limit : </Text>
          <Text style={{ fontWeight: 'bold' }}>₹{transaction_limit.toString()}</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount.toString()}
          placeholder="Amount"
          keyboardType="numeric"
          autoFocus
        />
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableHighlight onPress={() => {
            if (Number(amount) > 0) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setView(4);
              }, 2000)
            }
          }} disabled={isLoading}>
            <View style={styles.buttonBody}>
              {isLoading ? <View style={{ marginRight: 10 }}>
                <ActivityIndicator size="small" color="white" />
              </View> : null}
              <Text style={styles.buttonText}>Pay</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View> : null}
      {view === 4 ? <View style={styles.innerContainer}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Enter Security Pin : </Text>
        <TextInput
          style={[styles.input, { letterSpacing: 10 }]}
          onChangeText={setPin}
          value={pin}
          placeholder="######"
          keyboardType="numeric"
          autoFocus
          textContentType="password"
          textAlign="center"
          maxLength={6}
          secureTextEntry
        />
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableHighlight onPress={() => {
            setLoading(true);
            setTimeout(() => {
              dispatch({ type: 'update_wallet', payload: -amount });
              dispatch({
                type: 'insert_transaction', payload: {
                  id: uuid(),
                  name: MERCHANT_NAME,
                  time: new Date().getTime(),
                  amount: -amount
                }
              });
              setLoading(false);
              setView(5);
            }, 2000);
          }} disabled={isLoading}>
            <View style={styles.buttonBody}>
              {isLoading ? <View style={{ marginRight: 10 }}>
                <ActivityIndicator size="small" color="white" />
              </View> : null}
              <Text style={styles.buttonText}>Proceed</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View> : null}
      {view === 5 ? <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>You paid </Text>
        <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', marginBottom: 10 }}>{amount.toString()}</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>To</Text>
        <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 50 }]}>{MERCHANT_NAME}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', fontSize: 16 }}>
          <Text>Offline Wallet Balance : </Text>
          <Text style={{ fontWeight: 'bold' }}>{state.walletBalance < 0 ? '- ' : ''}₹{Math.abs(state.walletBalance).toString()}</Text>
        </View>
      </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: THEME.primaryColor,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonBody: {
    backgroundColor: THEME.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  altButtonBody: {
    backgroundColor: THEME.primaryColor,
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  altButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  }
});
