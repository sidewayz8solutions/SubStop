import { requestLocalPermissions, scheduleSubReminders } from './src/utils/notifications';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StatusBar, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { globalStyles } from './src/styles/theme';
import AddSubForm from './src/components/AddSubForm';
import SubItem from './src/components/SubItem';
import AnimatedSplash from './src/components/AnimatedSplash';
import { loadSubscriptions, saveSubscriptions } from './src/utils/storage';

// Keep the native splash visible while we load, then we hand off to our video splash
SplashScreen.preventAutoHideAsync().catch(() => {});

// ADVANCED CRASH INTERCEPTOR (Placed globally so it catches everything)
if (!__DEV__) {
    let errorLog = [];
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        errorLog.push(error.message);
        Alert.alert(
            "Crash Intercepted!",
            `Error Log:\n\n${errorLog.join('\n\n---\n\n')}`
        );
    });
}

export default function App() {
    const [subs, setSubs] = useState([]);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Request notification permissions on app start
        requestLocalPermissions();

        // Hide the native static splash as soon as React is ready —
        // our custom video splash takes over from here.
        SplashScreen.hideAsync().catch(() => {});

        // On boot: load data from the local database
        (async () => {
            const savedSubs = await loadSubscriptions();
            setSubs(savedSubs);
        })();
    }, []);

    const handleSplashFinish = useCallback(() => {
        setShowSplash(false);
    }, []);

    const handleAddSub = async (newSub) => {
        const updatedSubs = [newSub, ...subs];
        setSubs(updatedSubs);
        await saveSubscriptions(updatedSubs);
        await scheduleSubReminders(newSub.name, newSub.nextBillingDate);
    };

    const handleDeleteSub = async (id) => {
        const updatedSubs = subs.filter(sub => sub.id !== id);
        setSubs(updatedSubs);
        await saveSubscriptions(updatedSubs);
    };

    if (showSplash) {
        return (
            <>
                <StatusBar hidden />
                <AnimatedSplash onComplete={handleSplashFinish} />
            </>
        );
    }

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={globalStyles.title}>SubStop</Text>
            <AddSubForm onAdd={handleAddSub} />
            <FlatList
                data={subs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SubItem sub={item} onDelete={handleDeleteSub} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}