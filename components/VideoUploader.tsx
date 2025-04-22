import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const VideoUploader = ({
  onVideoSelect,
}: {
  onVideoSelect: (uri: string) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const selectVideo = () => {
    launchImageLibrary({mediaType: 'video'}, response => {
      if (
        response.didCancel ||
        response.errorCode ||
        !response.assets ||
        !response.assets[0].uri
      ) {
        console.log('User cancelled video picker or error occurred');
      } else {
        const videoUri = response.assets[0].uri;
        onVideoSelect(videoUri);
      }
    });
  };

  React.useEffect(() => {
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
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        Upload Your Video
      </Animated.Text>
      <Text style={styles.description}>
        Select a video from your library to upload and get a summary of the
        video. Make sure your video is in a supported format.
      </Text>
      <Image source={require('../assets/video-icon.jpg')} style={styles.icon} />
      <TouchableOpacity style={styles.button} onPress={selectVideo}>
        <Text style={styles.buttonText}>Select Video</Text>
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
  },
  animation: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  icon: {
    width: 300,
    height: 100,
    marginBottom: 20,
    objectFit: 'fill',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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

export default VideoUploader;
