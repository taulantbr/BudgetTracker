import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoImage from '../../assets/OIG2.jpg';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGoToReports = () => {
    navigation.navigate('Reports');
  };

  const handleGoToSettings = () => {
    navigation.navigate('Settings');
  };

  const handleGoToExpenseTracker = () => {
    navigation.navigate('ExpenseTracker');
  };

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleGoToMonthlySummary = () => {
    navigation.navigate('MonthlySummary');
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToExpenseTracker}>
        <Text style={styles.buttonText}>Go to ExpenseTracker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToDashboard}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToMonthlySummary}>
        <Text style={styles.buttonText}>Go to MonthlySummary</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToReports}>
        <Text style={styles.buttonText}>Go to Reports</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToSettings}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF', // Change this to your desired color
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;






