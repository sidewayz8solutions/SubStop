import React from 'react';
import { StyleSheet, View } from 'react-native';
// 1. Import the new video tools from expo-video
import { useVideoPlayer, VideoView } from 'expo-video';

export default function AnimatedSplash() {
    // 2. Load the video and tell it to auto-play using the new hook
    const player = useVideoPlayer(require('../../assets/splash.mp4'), player => {
        player.play();
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            {/* 3. Render the new VideoView component */}
            <VideoView
                player={player}
                style={styles.video}
                contentFit="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%',
    }
});