import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTransactionScreen = ({ navigation, route }) => {
  // Destrukturimi i parametrave nga route.params me vlera të paracaktuara
  const { saveTransaction, type, amount: initialAmount, description: initialDescription, index } = route.params || {};

  // Variablat për të menaxhuar detajet e transaksionit
  const [amount, setAmount] = useState(initialAmount ? initialAmount.toString() : '');
  const [description, setDescription] = useState(initialDescription || '');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Cakto opsionet e navigimit bazuar në faktin nëse bëhet fjalë për një modifikim ose një transaksion shtesë
  useEffect(() => {
    navigation.setOptions({ title: index !== undefined ? 'Edit Transaction' : 'Add Transaction' });
  }, [index, navigation]);

  // Trajtoni ndryshimin e datës kur përdorni komponentin DateTimePicker
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  // Shfaq modalin e zgjedhësit të datës
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  // Trajtoni ruajtjen e transaksionit
  const handleSaveTransaction = () => {
    const newTransaction = {
      type: type,
      amount: parseFloat(amount),
      description: description,
      date: selectedDate.toISOString(), // Save the selected date
    };

    // Vërtetoni detajet e transaksionit përpara se të ruani
    if (isNaN(newTransaction.amount) || newTransaction.amount <= 0 || description.trim() === '') {
      return;
    }

    // Thirrni funksionin saveTransaction dhe shkoni prapa
    saveTransaction(newTransaction, index);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Shfaq titullin e ekranit */}
      <Text style={styles.title}>{index !== undefined ? 'Edit Transaction' : 'Add Transaction'}</Text>

      {/* Fusha e hyrjes për shumën e transaksionit */}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        maxLength={30}
      />

      {/* Fusha e hyrjes për përshkrimin e transaksionit */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        maxLength={30}
      />

      {/* Paraqitni një fushë të hyrjes HTML ose DateTimePicker bazuar në platformë per te funksionuar ne web dhe expo app */}
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

      {/* Butoni për të ruajtur transaksionin */}
      <Button title="Save" onPress={handleSaveTransaction} />
    </View>
  );
};

// Stilimi i komponenteve
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
