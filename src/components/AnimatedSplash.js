import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function AnimatedSplash({ onComplete }) {
    // 1. Load the video, turn off looping, and auto-play
    const player = useVideoPlayer(require('../../assets/splash.mp4'), player => {
        player.loop = false;
        player.play();
    });

    // 2. Listen for the exact millisecond the video finishes
    useEffect(() => {
        const subscription = player.addListener('playToEnd', () => {
            if (onComplete) {
                onComplete(); // Tell App.js to load the main screen
            }
        });

        return () => subscription.remove();
    }, [player, onComplete]);

    return (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]}>
            {/* 3. Hide the controls so it looks like a real splash screen */}
            <VideoView
                player={player}
                style={styles.video}
                contentFit="cover"
                nativeControls={false}
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