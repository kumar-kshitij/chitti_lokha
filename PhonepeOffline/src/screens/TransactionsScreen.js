import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import SessionContext from '../SessionContext';
import { THEME } from '../constants';

export default function TransactionsScreen() {
  const { state } = useContext(SessionContext);

  return (
    <View style={styles.container}>
      {state.pendingTransactions.map(transaction => (
        <View key={transaction.id} style={{ borderColor: 'black', borderWidth: 1 }}>
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.nameText}>{transaction.name}</Text>
              <Text style={styles.timeText}>{new Date(transaction.time).toLocaleString()}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={[styles.amountText, { color: transaction.amount < 0 ? 'red' : 'green' }]}>
                {transaction.amount < 0 ? '- ' : '+ '}₹{Math.abs(transaction.amount).toString()}
              </Text>
            </View>
          </View>
          {state.isInternetReachable && transaction.amount < 0 ? <View>
            <TouchableHighlight onPress={() => { }}>
              <View style={styles.buttonBody}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </View>
            </TouchableHighlight>
          </View> : null}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  cardLeft: {
    flex: 1
  },
  cardRight: {},
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  timeText: {
    fontSize: 14
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonBody: {
    backgroundColor: THEME.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});
