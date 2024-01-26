// /src/screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressChart, LineChart } from 'react-native-chart-kit';

// Chart Configurations
const savingsChartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
};

const expenseChartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
};

const DashboardScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);

  useEffect(() => {
    loadTransactions();
    loadSavingsGoal();
  }, []);

  const loadTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
        calculateDashboardData(JSON.parse(savedTransactions));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const loadSavingsGoal = async () => {
    try {
      const savedSavingsGoal = await AsyncStorage.getItem('savingsGoal');
      if (savedSavingsGoal) {
        setSavingsGoal(parseFloat(savedSavingsGoal));
      }
    } catch (error) {
      console.error('Error loading savings goal:', error);
    }
  };

  const calculateDashboardData = (transactions) => {
    const totalBalanceValue = transactions.reduce(
      (acc, transaction) => acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
      0
    );
    setTotalBalance(totalBalanceValue);

    const totalIncomeValue = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalIncome(totalIncomeValue);

    const totalExpensesValue = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpenses(totalExpensesValue);
  };

  useEffect(() => {
    calculateDashboardData(transactions);
  }, [transactions]);

  const handleSetSavingsGoal = () => {
    navigation.navigate('SetSavingsGoal', { setSavingsGoal });
  };

  const savingsProgress = totalBalance >= savingsGoal ? 1 : totalBalance / savingsGoal;

  const barChartColor = (value) => {
    return value >= 0 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
  };

  const expenseAnalysisData = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      acc[date] = acc[date] || 0;
      acc[date] += transaction.amount;
      return acc;
    }, {});

  const expenseAnalysisLabels = Object.keys(expenseAnalysisData);
  const expenseAnalysisValues = expenseAnalysisLabels.map((label) => expenseAnalysisData[label]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard Screen</Text>

        <View style={styles.overviewContainer}>
          <Text>Total Balance: {totalBalance}</Text>
          <Text>Total Income: {totalIncome}</Text>
          <Text>Total Expenses: {totalExpenses}</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Savings Goals</Text>
          <Text>Goal you set for savings: {savingsGoal}</Text>
          <ProgressChart
            data={{
              labels: [''],
              data: [savingsProgress],
            }}
            width={380}
            height={200}
            chartConfig={savingsChartConfig}
          />
          <TouchableOpacity style={styles.button} onPress={handleSetSavingsGoal}>
            <Text style={styles.buttonText}>Set Savings Goal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Expense Analysis</Text>
          <LineChart
            data={{
              labels: expenseAnalysisLabels,
              datasets: [
                {
                  data: expenseAnalysisValues,
                },
              ],
            }}
            width={380}
            height={200}
            chartConfig={expenseChartConfig}
            fromZero={true} // Set fromZero to true
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewContainer: {
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartLabel: {
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;







