// /src/screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, Switch, Image } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = () => {
  const { logout, deleteAccount } = useAuth();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'Albanian', value: 'al' },
    { label: 'French', value: 'fr' },
    // Add more language options as needed
  ];

  const handleLogout = () => {
    logout();
    // Additional logic for handling logout (e.g., navigating to the login screen)
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Implement delete account logic
            deleteAccount();
            // Additional logic (e.g., navigating to the login screen)
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleToggleDarkMode = () => {
    // Implement logic to toggle dark mode
    // This can involve changing a state or dispatching an action
    // based on your application's state management (e.g., Redux, Context API)
    setDarkMode(!isDarkMode);
  };

  const handleOpenLanguageModal = () => {
    setLanguageModalVisible(true);
  };

  const handleCloseLanguageModal = () => {
    setLanguageModalVisible(false);
  };

  const handleSelectLanguage = () => {
    // Implement logic to set the selected language
    // This might involve saving the selected language in a state or storage
    // and updating the UI language based on the selected language
    handleCloseLanguageModal();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/settings-transparent.png')} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <Button title="Choose Language" onPress={handleOpenLanguageModal} style={styles.button} />
        <View style={styles.space} />
        <Button title="Logout" onPress={handleLogout} style={styles.button} />
        <View style={styles.space} />
        <Button title="Delete Account" onPress={handleDeleteAccount} style={styles.button} />
      </View>
      <View style={styles.space} />
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode:</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

      {/* Add other settings or UI components */}

      {/* Language Selection Modal */}
      <Modal isVisible={isLanguageModalVisible}>
        <View style={styles.languageModal}>
          <RNPickerSelect
            placeholder={{ label: 'Select a language...', value: null }}
            onValueChange={(value) => setSelectedLanguage(value)}
            items={languageOptions}
          />
          <Button title="Save" onPress={handleSelectLanguage} />
          <Button title="Cancel" onPress={handleCloseLanguageModal} />
        </View>
      </Modal>
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  languageModal: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  space: {
    height: 8, // Adjust the height as needed
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16, // Add space between Delete Account and Dark Mode
  },
  settingLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  buttonContainer: {
    width: '100%', // Ensure all buttons take full width
  },
  button: {
    width: '100%', // Make all buttons have equal width
    borderRadius: 8, // Add border radius
  },
});

export default SettingsScreen;













