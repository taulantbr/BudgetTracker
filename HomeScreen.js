import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoImage from '../../assets/OIG2.jpg';

const HomeScreen = () => {
  // Hyni në objektin e navigimit për të shkuar në ekrane të ndryshme
  const navigation = useNavigation();

  // Funksioni për të shkuar në Reports Screen
  const handleGoToReports = () => {
    navigation.navigate('Reports');
  };

  // Funksioni per te shkuar ne Settings screen
  const handleGoToSettings = () => {
    navigation.navigate('Settings');
  };

  // Funksioni pe te shkuar ne ExpenseTracker screen
  const handleGoToExpenseTracker = () => {
    navigation.navigate('ExpenseTracker');
  };

  // Funksioni per te shkuar ne Dashboard screen
  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  // Funksioni per te shkuar ne MonthlySummary screen
  const handleGoToMonthlySummary = () => {
    navigation.navigate('MonthlySummary');
  };

  return (
    <View style={styles.container}>
      {/* Shfaqim logo image */}
      <Image source={LogoImage} style={styles.logo} />
      
      {/* Titulli */}
      <Text style={styles.title}>Home</Text>
      
      {/* Butona per te shkuar ne screens te ndryshme */}
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

// Stilimi i komponenteve
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
    backgroundColor: '#007BFF', 
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
