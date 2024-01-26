import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTransactionScreen = ({ navigation, route }) => {
  const { saveTransaction, type, amount: initialAmount, description: initialDescription, index } = route.params || {};

  const [amount, setAmount] = useState(initialAmount ? initialAmount.toString() : '');
  const [description, setDescription] = useState(initialDescription || '');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: index !== undefined ? 'Edit Transaction' : 'Add Transaction' });
  }, [index, navigation]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSaveTransaction = () => {
    const newTransaction = {
      type: type,
      amount: parseFloat(amount),
      description: description,
      date: selectedDate.toISOString(), // Save the selected date
    };

    if (isNaN(newTransaction.amount) || newTransaction.amount <= 0 || description.trim() === '') {
      return;
    }

    saveTransaction(newTransaction, index);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{index !== undefined ? 'Edit Transaction' : 'Add Transaction'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        maxLength={30}
      />
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => handleDateChange(null, new Date(e.target.value))}
        />
      ) : (
        <>
          <Button title="Select Date" onPress={showDatePickerModal} />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      )}
      <Button title="Save" onPress={handleSaveTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default AddTransactionScreen;















