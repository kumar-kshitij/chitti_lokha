import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ProgressBarAndroid } from 'react-native';

const AMOUNT = 100;
const SENDER_NAME = 'Aryan Gaurav';

export default function RecieveScreen() {
  const [view, setView] = useState(1);
  // const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    setTimeout(() => {
      setView(2);
      setTimeout(() => setView(3), 3000);
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
        <ActivityIndicator size="large" color="#007AFF" />
      </View> : null}
      {view === 2 ? <View>
        <Text style={styles.text}>Recieving money from </Text>
        <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10 }]}>{SENDER_NAME}</Text>
        <ProgressBarAndroid styleAttr="Horizontal"
        // indeterminate={false}
        // progress={progress}
        />
      </View> : null}
      {view === 3 ? <View>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{SENDER_NAME}</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}> paid</Text>
        <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold' }}>{AMOUNT.toString()}</Text>
      </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
