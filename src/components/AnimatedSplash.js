import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function AnimatedSplash({ onFinish }) {
  const videoRef = useRef(null);

  const handlePlaybackStatusUpdate = useCallback((status) => {
    if (status.didJustFinish) {
      onFinish();
    }
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/splash.MP4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width,
    height,
  },
});
