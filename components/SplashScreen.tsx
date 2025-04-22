import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      console.log('Timer finished');
    }, 5000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/mainScene.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Text style={[styles.title, {opacity: fadeAnim}]}>
        Welcome to Video Summary App
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE3',
  },
  lottie: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
    marginTop: 10,
  },
});

export default SplashScreen;
