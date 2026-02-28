import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { globalStyles } from './src/styles/theme';
import AddSubForm from './src/components/AddSubForm';
import SubItem from './src/components/SubItem';
import { loadSubscriptions, saveSubscriptions } from './src/utils/storage';
import { Alert } from 'react-native';

/// ADVANCED CRASH INTERCEPTOR
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

    useEffect(async () => {
            const savedSubs = await loadSubscriptions();
            setSubs(savedSubs);
            await requestPermissions();
        })();
    } [];

    const handleAddSub = async (newSub) => {
        const updatedSubs = [newSub, ...subs];
        setSubs(updatedSubs);
        await saveSubscriptions(updatedSubs);

        // MVP logic: Alert them 28 days from now assuming a monthly sub added today
        
    };

    const handleDeleteSub = async (id) => {
        const updatedSubs = subs.filter(sub => sub.id !== id);
        setSubs(updatedSubs);
        await saveSubscriptions(updatedSubs);
    };

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={globalStyles.title}>SubStop</Text>
            <Text style={globalStyles.subtitle}>Private. Local. Zero hidden fees.</Text>

            <AddSubForm onAdd={handleAddSub} />

            <FlatList
                data={subs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SubItem sub={item} onDelete={handleDeleteSub} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
