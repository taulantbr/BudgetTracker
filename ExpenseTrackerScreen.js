import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

const ExpenseTrackerScreen = ({ navigation }) => {
  // Hyni në kontekstin e authentication për të kontrolluar nëse përdoruesi është authenticated
  const { isAuthenticated } = useAuth();

  // Gjendja për të menaxhuar listën e transaksioneve
  const [transactions, setTransactions] = useState([]);

  // Ngarko transaksionet nga AsyncStorage 
  useEffect(() => {
    loadTransactions();
  }, []);

  // Funksioni për të ngarkuar transaksione nga AsyncStorage
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

  // Funksioni për të fshirë një transaksion në një indeks të caktuar
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

  // Funksioni për të shkuar në ekranin AddTransaction me një lloj të caktuar
  const handleAddTransaction = (type) => {
    navigation.navigate('AddTransaction', {
      saveTransaction: saveTransaction,
      type: type,
    });
  };

  // Funksioni për të ruajtur një transaksion të ri ose për të modifikuar një ekzistues
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

  // Funksioni për të trajtuar fshirjen e një transaksioni
  const handleDelete = async (index) => {
    await deleteTransaction(index);
  };

  // Funksioni për të trajtuar editimin e një transaksioni
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
      {/* Titulli i ekranit */}
      <Text style={styles.title}>Expense Tracker Screen</Text>

      {/* Shfaq transaksionet nëse përdoruesi është i vërtetuar, përndryshe shfaq një kërkesë për hyrje */}
      {isAuthenticated ? (
        <>
          {/* FlatList për të shfaqur transaksionet */}
          <FlatList
            data={transactions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.transactionContainer}>
                {/* Shfaq detajet e transaksionit */}
                <Text style={styles.transactionText}>
                  {item.type === 'expense' ? '-' : '+'} {item.amount}: {item.description}
                </Text>
                
                {/* Butonat për të modifikuar dhe fshirë transaksionin */}
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Butonat për të shtuar transaksionet e shpenzimeve dhe të ardhurave */}
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
