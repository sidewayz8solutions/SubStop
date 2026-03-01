import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEventListener } from 'expo';

export default function AnimatedSplash({ onComplete }) {
    // 1. Load the video into memory (but don't play it yet!)
    const player = useVideoPlayer(require('../../assets/splash.mp4'), player => {
        player.loop = false;
    });

    // 2. Wait for iOS to confirm the buffer is loaded, THEN force play
    useEventListener(player, 'statusChange', ({ status }) => {
        if (status === 'readyToPlay') {
            player.play();
        }
    });

    // 3. Catch the exact millisecond it finishes and transition to the app
    useEventListener(player, 'playToEnd', () => {
        if (onComplete) {
            onComplete();
        }
    });

    return (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]}>
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
        flex: 1,
        width: '100%',
        height: '100%',
    }
});