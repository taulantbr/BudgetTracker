import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressChart, LineChart } from 'react-native-chart-kit';

// Konfigurimet e grafikut
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
  // Variablat për të menaxhuar të dhënat për panelin e kontrollit
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);

  // Ngarko transaksionet dhe objektivin e kursimeve nga AsyncStorage në montimin e komponentëve
  useEffect(() => {
    loadTransactions();
    loadSavingsGoal();
  }, []);

  // Ngarko transaksionet nga AsyncStorage dhe llogarit të dhënat e panelit
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

  // Ngarko objektivin e kursimit nga AsyncStorage
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

  // Llogaritja e gjendjes totale, të ardhurat dhe shpenzimet bazuar në transaksionet
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

  // Rillogaritni të dhënat e dashboard kur ndryshojnë transaksionet
  useEffect(() => {
    calculateDashboardData(transactions);
  }, [transactions]);

  // Trajtoni navigimin në skenën SetSavingsGoal
  const handleSetSavingsGoal = () => {
    navigation.navigate('SetSavingsGoal', { setSavingsGoal });
  };

  // Llogaritni progresin për grafikun e synimeve të kursimeve
  const savingsProgress = totalBalance >= savingsGoal ? 1 : totalBalance / savingsGoal;

  // Përcaktoni ngjyrën për grafikun me shtylla bazuar në vlerën
  const barChartColor = (value) => {
    return value >= 0 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
  };

  // Ekstraktoni të dhënat për grafikun e analizës së shpenzimeve
  const expenseAnalysisData = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      acc[date] = acc[date] || 0;
      acc[date] += transaction.amount;
      return acc;
    }, {});

  // Ekstraktoni labels dhe vlerat për grafikun e analizës së shpenzimeve
  const expenseAnalysisLabels = Object.keys(expenseAnalysisData);
  const expenseAnalysisValues = expenseAnalysisLabels.map((label) => expenseAnalysisData[label]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Shfaq titullin e ekranit */}
        <Text style={styles.title}>Dashboard Screen</Text>

        {/* Shfaqni nje overwien te dhenave */}
        <View style={styles.overviewContainer}>
          <Text>Total Balance: {totalBalance}</Text>
          <Text>Total Income: {totalIncome}</Text>
          <Text>Total Expenses: {totalExpenses}</Text>
        </View>

        {/* Shfaq chartin Saving goals */}
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

        {/* Shfaq Expense Analysis chart */}
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

// Stilimi i komponenteve
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
