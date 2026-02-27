import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function AddSubForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!name || !price) return;
    onAdd({ id: Date.now().toString(), name, price: parseFloat(price).toFixed(2) });
    setName('');
    setPrice('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Service Name (e.g. Spotify)"
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Monthly Cost ($)"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addText}>+ Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginBottom: 30 },
  input: { backgroundColor: colors.card, color: colors.textMain, padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 10 },
  row: { flexDirection: 'row' },
  addButton: { backgroundColor: colors.success, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, marginBottom: 10 },
  addText: { color: colors.background, fontWeight: '900', fontSize: 16 }
});
