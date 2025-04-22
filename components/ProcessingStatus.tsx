import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const ProcessingStatus = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/fruitLoading.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <LottieView
        source={require('../assets/loading.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.text}>Processing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: -50,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default ProcessingStatus;
