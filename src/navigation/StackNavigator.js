// /src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import ExpenseTrackerScreen from '../screens/ExpenseTrackerScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen'; // Import the RegistrationScreen
import { useAuth } from '../contexts/AuthContext';
import DashboardScreen from '../screens/DashboardScreen';
import SetSavingsGoalScreen from '../screens/SetSavingsGoalScreen';
import MonthlySummaryScreen from '../screens/MonthlySummaryScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator initialRouteName="LoginSignup">
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ExpenseTracker" component={ExpenseTrackerScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="SetSavingsGoal" component={SetSavingsGoalScreen} />
          <Stack.Screen name="MonthlySummary" component={MonthlySummaryScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        </>
      )}
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;






