// /src/screens/ReportsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportsScreen = () => {
  // State variables
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  // Component lifecycle hook to load transactions on mount
  useEffect(() => {
    loadTransactions();
  }, []);

  // Load transactions from AsyncStorage
  const loadTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
        calculateChartData(JSON.parse(savedTransactions));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  // Calculate chart data from transactions
  const calculateChartData = (transactions) => {
    const expenseData = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpenses(expenseData);

    const incomeData = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalIncomes(incomeData);

    const result = [
      { name: 'Expenses', value: expenseData, color: '#FF0000' }, // Red color for expenses
      { name: 'Incomes', value: incomeData, color: '#0000FF' }, // Blue color for incomes
    ];

    setChartData(result);
  };

  // Component rendering
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports Screen</Text>
      <Text>Total Expenses: {totalExpenses}</Text>
      <Text>Total Incomes: {totalIncomes}</Text>
      <Text>Balance: {totalIncomes - totalExpenses}</Text>
      <Text>{totalIncomes - totalExpenses > 0 ? 'Positive' : 'Negative'}</Text>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Set color to transparent
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

// Styles
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
});


export default ReportsScreen;






