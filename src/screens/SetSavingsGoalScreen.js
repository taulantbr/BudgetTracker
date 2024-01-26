// /src/screens/SetSavingsGoalScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetSavingsGoalScreen = ({ navigation, route }) => {
  const { setSavingsGoal } = route.params || {};
  const [newSavingsGoal, setNewSavingsGoal] = useState('');

  const handleSetSavingsGoal = async () => {
    try {
      const parsedSavingsGoal = parseFloat(newSavingsGoal);

      if (isNaN(parsedSavingsGoal) || parsedSavingsGoal <= 0) {
        // Validate that the input is a positive number
        // Display an error message or prevent setting the goal if the input is invalid
        return;
      }

      // Save the new savings goal to AsyncStorage
      await AsyncStorage.setItem('savingsGoal', parsedSavingsGoal.toString());

      // Update the savings goal in the parent screen using setSavingsGoal function
      setSavingsGoal(parsedSavingsGoal);

      // Navigate back to the DashboardScreen
      navigation.goBack();
    } catch (error) {
      console.error('Error setting savings goal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Savings Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your savings goal"
        keyboardType="numeric"
        value={newSavingsGoal}
        onChangeText={(text) => setNewSavingsGoal(text)}
      />
      <Button title="Set Goal" onPress={handleSetSavingsGoal} />
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
