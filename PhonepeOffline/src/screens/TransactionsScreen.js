import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.nameText}>WASIF STATIONARY</Text>
          <Text style={styles.timeText}>1 May, 11:47 PM</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={[styles.amountText, { color: 'red' }]}>- ₹100.00</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.nameText}>NIZDAIN AHMED</Text>
          <Text style={styles.timeText}>1 May, 11:59 AM</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={[styles.amountText, { color: 'green' }]}>+ ₹50.00</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  cardLeft: {
    flex: 1
  },
  cardRight: {},
  nameText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  timeText: {},
  amountText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
