import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Komponent funksional për ReportsScreen
const ReportsScreen = () => {
  // State variables to store transactions, chart data, total expenses, and total incomes
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  // Lidhja e komponentit për të ngarkuar transaksionet
  useEffect(() => {
    loadTransactions();
  }, []);

  // Ngarko transaksionet nga AsyncStorage
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

  // Llogaritni të dhënat e grafikut nga transaksionet
  const calculateChartData = (transactions) => {
    // Calculate total expenses and total incomes
    const expenseData = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpenses(expenseData);

    const incomeData = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalIncomes(incomeData);

    // Përgatitni të dhëna për komponentin PieChart
    const result = [
      { name: 'Expenses', value: expenseData, color: '#FF0000' }, // Red color for expenses
      { name: 'Incomes', value: incomeData, color: '#0000FF' }, // Blue color for incomes
    ];

    setChartData(result);
  };

  // Paraqitja e komponentit
  return (
    <View style={styles.container}>
      {/* Shfaq titullin e ekranit */}
      <Text style={styles.title}>Reports Screen</Text>

      {/* Shfaq shpenzimet totale, të ardhurat totale, bilancin dhe nëse është pozitiv apo negativ */}
      <Text>Total Expenses: {totalExpenses}</Text>
      <Text>Total Incomes: {totalIncomes}</Text>
      <Text>Balance: {totalIncomes - totalExpenses}</Text>
      <Text>{totalIncomes - totalExpenses > 0 ? 'Positive' : 'Negative'}</Text>

      {/* Paraqitni komponentin PieChart me të dhëna */}
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

// Stilimi i komponenteve
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
