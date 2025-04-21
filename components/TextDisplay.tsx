import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import RNFS from 'react-native-fs';
import LottieView from 'lottie-react-native';

const TextDisplay = ({summary}: {summary: string}) => {
  const downloadText = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log('Requesting storage permission...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download files',
            buttonPositive: 'Allow',
          },
        );
        console.log('Permission result:', granted);
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
      console.log('Attempting to write to:', textPath);
      await RNFS.writeFile(textPath, summary, 'utf8');
      console.log('Text file written to:', textPath);
      Alert.alert('Success', 'Text downloaded successfully!');
    } catch (err) {
      console.error('Error writing text file:', err);
      Alert.alert('Error', 'Failed to download text.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{summary}</Text>
      <Button title="Download Text" onPress={downloadText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  animation: {
    width: 100,
    height: 100,
  },
});

export default TextDisplay;
