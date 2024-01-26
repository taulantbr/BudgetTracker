import React from 'react';
import { View, Text, Button } from 'react-native';

const DrawerContent = ({ navigation }) => {
  return (
    <View>
      <Text>Drawer Content</Text>
      <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <Button title="Expense Tracker" onPress={() => navigation.navigate('ExpenseTracker')} />
      <Button title="Reports" onPress={() => navigation.navigate('Reports')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default DrawerContent;

