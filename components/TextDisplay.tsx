import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  Animated,
} from 'react-native';
import RNFS from 'react-native-fs';
import LottieView from 'lottie-react-native';

const capitalizeSentences = (text: string): string => {
  return text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c: string) => c.toUpperCase());
};

const addPunctuation = (text: string): string => {
  // Simple heuristic to add periods at the end of sentences if missing
  return text.replace(/([a-zA-Z0-9])(\s+)(?=[A-Z])/g, '$1.$2');
};

const TextDisplay = ({summary}: {summary: string}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, titleAnim]);

  const formattedSummary = capitalizeSentences(addPunctuation(summary));

  const downloadText = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download files',
            buttonPositive: 'Allow',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Required',
            'Storage permission is required to download files. Please enable it in the app settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        }
      }

      const textPath = `${RNFS.ExternalStorageDirectoryPath}/summary.txt`;
      await RNFS.writeFile(textPath, formattedSummary, 'utf8');
      Alert.alert('Success', 'Text downloaded successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to download text.');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, {opacity: titleAnim}]}>
        Uploaded Video Summary
      </Animated.Text>
      <Animated.Text
        style={[
          styles.text,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        {formattedSummary}
      </Animated.Text>
      <TouchableOpacity style={styles.button} onPress={downloadText}>
        <Text style={styles.buttonText}>Download Text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    fontWeight: 'bold',
    padding: 15,
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TextDisplay;
