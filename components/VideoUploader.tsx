import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const VideoUploader = ({
  onVideoSelect,
}: {
  onVideoSelect: (uri: string) => void;
}) => {
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

  return (
    <View style={styles.container}>
      <Button title="Select Video" onPress={selectVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default VideoUploader;
