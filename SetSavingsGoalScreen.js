import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetSavingsGoalScreen = ({ navigation, route }) => {
  // Destrukturoni funksionin setSavingsGoal nga parametrat e route
  const { setSavingsGoal } = route.params || {};

  // Variabli i gjendjes për të menaxhuar hyrjen e qëllimit të ri të kursimeve
  const [newSavingsGoal, setNewSavingsGoal] = useState('');

  // Funksioni për të trajtuar vendosjen e qëllimit të ri të kursimeve
  const handleSetSavingsGoal = async () => {
    try {
      // Analizoni hyrjen në një numër me floating-point
      const parsedSavingsGoal = parseFloat(newSavingsGoal);

      // Vërtetoni që hyrja është një numër pozitiv
      if (isNaN(parsedSavingsGoal) || parsedSavingsGoal <= 0) {
        // Display an error message or prevent setting the goal if the input is invalid
        return;
      }

      // Ruani qëllimin e ri të kursimeve në AsyncStorage
      await AsyncStorage.setItem('savingsGoal', parsedSavingsGoal.toString());

      // Përditësoni qëllimin e kursimeve në ekranin prind duke përdorur funksionin setSavingsGoal
      setSavingsGoal(parsedSavingsGoal);

      // Navigoni përsëri te Ekrani i Dashboard
      navigation.goBack();
    } catch (error) {
      console.error('Error setting savings goal:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Shfaq titullin e ekranit*/}
      <Text style={styles.title}>Set Savings Goal</Text>

      {/* Fusha e hyrjes për të hyrë në savings goal */}
      <TextInput
        style={styles.input}
        placeholder="Enter your savings goal"
        keyboardType="numeric"
        value={newSavingsGoal}
        onChangeText={(text) => setNewSavingsGoal(text)}
      />

      {/* Butoni për të aktivizuar vendosjen e objektivit të ri të kursimeve */}
      <Button title="Set Goal" onPress={handleSetSavingsGoal} />
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

export default SetSavingsGoalScreen;
