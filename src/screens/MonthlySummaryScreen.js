// /src/screens/MonthlySummaryScreen.jsnpm install react-native-modal

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const MonthlySummaryScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString()); // Month is 0-indexed

  useEffect(() => {
    loadTransactions();
  }, [selectedYear, selectedMonth]);

  const loadTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions);
        const filteredTransactions = filterTransactionsByMonth(parsedTransactions);
        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const filterTransactionsByMonth = (allTransactions) => {
    return allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear().toString() === selectedYear &&
        (transactionDate.getMonth() + 1).toString() === selectedMonth
      );
    });
  };

  const calculateSummary = () => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return { totalIncome, totalExpense };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Summary</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {/* Add years as needed */}
          <Picker.Item label="2024" value="2024" />
          <Picker.Item label="2025" value="2025" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {/* Add months as needed */}
          <Picker.Item label="January" value="1" />
          <Picker.Item label="February" value="2" />
          <Picker.Item label="March" value="3" />
          <Picker.Item label="April" value="4" />
          <Picker.Item label="May" value="5" />
          <Picker.Item label="June" value="6" />
          <Picker.Item label="July" value="7" />
          <Picker.Item label="August" value="8" />
          <Picker.Item label="September" value="9" />
          <Picker.Item label="October" value="10" />
          <Picker.Item label="November" value="11" />
          <Picker.Item label="December" value="12" />
          
          {/* Add other months */}
        </Picker>
      </View>
      <Text>Total Income: {calculateSummary().totalIncome}</Text>
      <Text>Total Expenses: {calculateSummary().totalExpense}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default MonthlySummaryScreen;
