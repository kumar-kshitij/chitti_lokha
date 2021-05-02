import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import { THEME, SENDER_NAME } from '../constants';
import SessionContext from '../SessionContext';
import { uuid } from '../utils';

const AMOUNT = 100;

export default function ReceiveScreen() {
  const [view, setView] = useState(1);
  // const [progress, setProgress] = useState(0.1);
  const { state, dispatch } = useContext(SessionContext);

  useEffect(() => {
    setTimeout(() => {
      setView(2);
      setTimeout(() => {
        dispatch({ type: 'update_wallet', payload: AMOUNT });
        dispatch({
          type: 'insert_transaction', payload: {
            id: uuid(),
            name: SENDER_NAME,
            time: new Date().getTime(),
            amount: AMOUNT
          }
        });
        setView(3);
      }, 3000);
    }, 5000);
  }, []);

  // useEffect(() => {
  //   if (view === 2) {
  //     setTimeout(() => setProgress(Math.min(progress * 2, 1)), 575);
  //   }
  // }, [view, progress])

  return (
    <View style={styles.container}>
      {view === 1 ? <View>
        <Text style={[styles.text, { marginBottom: 10 }]}>Waiting for sender...</Text>
        <ActivityIndicator size="large" color={THEME.primaryColor} />
      </View> : null}
      {view === 2 ? <View>
        <Text style={styles.text}>Recieving money from </Text>
        <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10 }]}>{SENDER_NAME}</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color={THEME.primaryColor}
        // indeterminate={false}
        // progress={progress}
        />
      </View> : null}
      {view === 3 ? <View>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{SENDER_NAME}</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}> paid</Text>
        <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', marginBottom: 50 }}>{AMOUNT.toString()}</Text>
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
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
