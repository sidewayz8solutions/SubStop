import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors } from '../styles/theme';

export default function SubItem({ sub, onDelete }) {

    const handleManage = () => {
        Alert.alert(
            "Cancel Subscription",
            `How are you billed for ${sub.name}?`,
            [
                {
                    text: "App Store / Apple",
                    onPress: () => Linking.openURL('https://apps.apple.com/account/subscriptions')
                },
                {
                    text: "Website / Other",
                    onPress: () => routeToWebsite()
                },
                {
                    text: "Nevermind",
                    style: "cancel"
                }
            ]
        );
    };

    const routeToWebsite = () => {
        // Convert their input to lowercase to match our database
        const name = sub.name.toLowerCase().trim();

        // Our mini-database of exact cancellation pages
        const cancelUrls = {
            'netflix': 'https://www.netflix.com/cancelplan',
            'spotify': 'https://www.spotify.com/account/subscriptions/',
            'hulu': 'https://secure.hulu.com/account',
            'amazon prime': 'https://www.amazon.com/mc/pipelines/cancellation',
            'amazon': 'https://www.amazon.com/mc/pipelines/cancellation',
            'disney+': 'https://www.disneyplus.com/account',
            'disney plus': 'https://www.disneyplus.com/account',
            'planet fitness': 'https://www.google.com/search?q=how+to+cancel+planet+fitness+membership+in+person'
        };

        if (cancelUrls[name]) {
            // If we know it, take them straight to the cancel page
            Linking.openURL(cancelUrls[name]);
        } else {
            // If we don't know it, Google the exact cancellation instructions for them
            const query = encodeURIComponent(`how to cancel ${sub.name} subscription`);
            Linking.openURL(`https://www.google.com/search?q=${query}`);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{sub.name}</Text>
                <Text style={styles.price}>${sub.price}/mo</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleManage}>
                    <Text style={styles.btnText}>Manage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(sub.id)}>
                    <Text style={styles.btnText}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: colors.card, padding: 15, borderRadius: 12, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { color: colors.textMain, fontSize: 18, fontWeight: 'bold' },
    price: { color: colors.textMuted, fontSize: 14, marginTop: 4 },
    actions: { flexDirection: 'row', gap: 10 },
    cancelBtn: { backgroundColor: colors.accent, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
    deleteBtn: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
    btnText: { color: 'white', fontWeight: 'bold' }
});