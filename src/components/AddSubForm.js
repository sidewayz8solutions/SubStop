import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddSubForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [cycle, setCycle] = useState('Monthly');

  const handleSubmit = () => {
    if (!name || !price) return;

    onAdd({
      id: Date.now().toString(),
      name,
      price: parseFloat(price).toFixed(2),
      nextBillingDate: date.toISOString(),
      cycle
    });

    // Reset form
    setName('');
    setPrice('');
    setDate(new Date());
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Service Name (e.g. Spotify)"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Monthly Cost ($)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      {/* NEW: Date Picker and Cycle Toggle */}
      <View style={styles.settingsRow}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Next Bill:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="compact"
            onChange={(event, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
            themeVariant="dark"
          />
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, cycle === 'Monthly' && styles.toggleActive]}
            onPress={() => setCycle('Monthly')}
          >
            <Text style={[styles.toggleText, cycle === 'Monthly' && styles.toggleTextActive]}>Mo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, cycle === 'Yearly' && styles.toggleActive]}
            onPress={() => setCycle('Yearly')}
          >
            <Text style={[styles.toggleText, cycle === 'Yearly' && styles.toggleTextActive]}>Yr</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Subscription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
    marginRight: 10,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  toggleActive: {
    backgroundColor: '#0A84FF',
  },
  toggleText: {
    color: '#888',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#0A84FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});