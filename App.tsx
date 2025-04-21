/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import SplashScreen from './components/SplashScreen';
import VideoUploader from './components/VideoUploader';
import ProcessingStatus from './components/ProcessingStatus';
import TextDisplay from './components/TextDisplay';
import axios from 'axios';

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [isProcessing, setProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoSelect = (uri: string) => {
    setVideoUri(uri);
    setProcessing(true);
    uploadVideo(uri);
  };

  const uploadVideo = async (uri: string) => {
    const formData = new FormData();
    formData.append('video', {
      uri,
      type: 'video/mp4',
      name: 'video.mp4',
    });

    try {
      const response = await axios.post(
        'http://10.0.2.2:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setProcessing(false);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
  };

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!videoUri && !isProcessing && !summary && (
        <VideoUploader onVideoSelect={handleVideoSelect} />
      )}
      {isProcessing && <ProcessingStatus />}
      {summary && <TextDisplay summary={summary} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
