import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';

const MERCHANT_NAME = 'WASIF STATIONARY';

export default function SendScreen() {
  const [view, setView] = useState(1);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  function onChangeAmount(value) {
    setAmount(Number(value));
  }

  useEffect(() => {
    setTimeout(() => setView(2), 5000);
  }, []);

  return (
    <View style={styles.container}>
      {view === 1 ? <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>Searching for nearby merchants...</Text>
        <ActivityIndicator size="large" color="#007AFF" />
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
        <Text style={styles.merchantName}>{MERCHANT_NAME}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount.toString()}
          placeholder="Amount"
          keyboardType="numeric"
          autoFocus
        />
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableHighlight onPress={() => setView(4)}>
            <View style={styles.buttonBody}>
              <Text style={styles.buttonText}>Pay</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View> : null}
      {view === 4 ? <View style={styles.innerContainer}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>Enter UPI Pin : </Text>
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
          <TouchableHighlight onPress={() => setView(5)}>
            <View style={styles.buttonBody}>
              <Text style={styles.buttonText}>Proceed</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View> : null}
      {view === 5 ? <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>You paid </Text>
        <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', marginBottom: 10 }}>{amount.toString()}</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>To</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{MERCHANT_NAME}</Text>
      </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  merchantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50
  },
  buttonBody: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  altButtonBody: {
    backgroundColor: '#007AFF',
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
