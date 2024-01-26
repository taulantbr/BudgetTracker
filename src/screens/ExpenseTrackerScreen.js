// /src/screens/ExpenseTrackerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

const ExpenseTrackerScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const deleteTransaction = async (index) => {
    try {
      const updatedTransactions = transactions.filter((_, i) => i !== index);

      setTransactions(updatedTransactions, async () => {
        await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleAddTransaction = (type) => {
    navigation.navigate('AddTransaction', {
      saveTransaction: saveTransaction,
      type: type,
    });
  };

  const saveTransaction = async (newTransaction, indexToEdit) => {
    try {
      let updatedTransactions;

      if (indexToEdit !== undefined) {
        updatedTransactions = transactions.map((item, index) =>
          index === indexToEdit ? newTransaction : item
        );
      } else {
        updatedTransactions = [...transactions, newTransaction];
      }

      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDelete = async (index) => {
    await deleteTransaction(index);
  };

  const handleEdit = (index) => {
    const existingTransaction = transactions[index];
    navigation.navigate('AddTransaction', {
      saveTransaction: saveTransaction,
      type: existingTransaction.type,
      amount: existingTransaction.amount,
      description: existingTransaction.description,
      index: index,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker Screen</Text>
      {isAuthenticated ? (
        <>
          <FlatList
            data={transactions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.transactionContainer}>
                <Text style={styles.transactionText}>
                  {item.type === 'expense' ? '-' : '+'} {item.amount}: {item.description}
                </Text>
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddTransaction('expense')}
          >
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddTransaction('income')}
          >
            <Text style={styles.addButtonText}>Add Income</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loginText}>Please log in to access the expense tracker.</Text>
      )}
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
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  transactionText: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'orange',
    marginRight: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
  },
});

export default ExpenseTrackerScreen;






















