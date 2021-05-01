import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate('Send Money')}>
        <View style={styles.buttonBody}>
          <Text style={styles.buttonText}>Send Money</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Recieve Money')}>
        <View style={styles.buttonBody}>
          <Text style={styles.buttonText}>Recieve Money</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Pending Transactions')}>
        <View style={styles.buttonBody}>
          <Text style={styles.buttonText}>View Pending Transactions</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'
  },
  buttonBody: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  }
});
