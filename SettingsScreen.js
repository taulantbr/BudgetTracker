import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, Switch, Image } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../contexts/AuthContext';

// Komponentet funksionale për SettingsScreen
const SettingsScreen = () => {
  // Hyni në kontekstin e autoidentifikimit për funksionet e daljes dhe fshirjes së llogarisë
  const { logout, deleteAccount } = useAuth();

  // Variablat për të menaxhuar dukshmërinë modale të gjuhës, gjuhën e zgjedhur dhe modin e errët
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);

  // Një sërë opsionesh gjuhësore për zgjedhësin e gjuhës
  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'Albanian', value: 'al' },
    { label: 'French', value: 'fr' },
    // Add more language options as needed
  ];

  // Funksioni për të trajtuar daljen e përdoruesit
  const handleLogout = () => {
    logout();
    // Additional logic for handling logout (e.g., navigating to the login screen)
  };

  // Funksioni për të trajtuar fshirjen e llogarisë me alarm konfirmimi
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
            // Ketu mu implementu logjika e fshirjes
            deleteAccount();
            // mun te shkruhet logjik shtes (psh pas fshirjes mu navigu te ekrani loginsignup)
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Funksion per te leshuar dark mode
  const handleToggleDarkMode = () => {
    // Ketu mu shkru logjika e implementimit te dark mode
    // Kjo mund të përfshijë ndryshimin e një gjendjeje ose dërgimin e një veprimi
    // bazuar në menaxhimin e gjendjes së aplikacionit (p.sh. Redux, Context API)
    setDarkMode(!isDarkMode);
  };

  // Funksioni për të hapur modin e përzgjedhjes së gjuhës
  const handleOpenLanguageModal = () => {
    setLanguageModalVisible(true);
  };

  // Funksioni për të mbyllur modin e përzgjedhjes së gjuhës
  const handleCloseLanguageModal = () => {
    setLanguageModalVisible(false);
  };

  // Funksioni për të trajtuar përzgjedhjen e gjuhës dhe për të mbyllur modin
  const handleSelectLanguage = () => {
    // Zbatoni logjikën për të vendosur gjuhën e zgjedhur ketu
    // Kjo mund të përfshijë ruajtjen e gjuhës së zgjedhur në një gjendje ose hapësirë ​​ruajtëse
    //dhe përditësimi i gjuhës së ndërfaqes së përdoruesit bazuar në gjuhën e zgjedhur
    handleCloseLanguageModal();
  };

  // Paraqitja e komponentit
  return (
    <View style={styles.container}>
      {/* Shfaq logon e settings */}
      <Image source={require('../../assets/settings-transparent.png')} style={styles.logo} />

      {/* Kontejneri i butonit për Zgjidhni gjuhën, Dilni dhe Fshi llogarinë */}
      <View style={styles.buttonContainer}>
        <Button title="Choose Language" onPress={handleOpenLanguageModal} style={styles.button} />
        <View style={styles.space} />
        <Button title="Logout" onPress={handleLogout} style={styles.button} />
        <View style={styles.space} />
        <Button title="Delete Account" onPress={handleDeleteAccount} style={styles.button} />
      </View>

      {/* Hapsir */}
      <View style={styles.space} />

      {/* Rresht per te leshuar dark mode */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode:</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

     
      {/* Modi i zgjedhjes se gjuhes */}
      <Modal isVisible={isLanguageModalVisible}>
        <View style={styles.languageModal}>
          {/* Dropdown per te zgjedh gjuhen */}
          <RNPickerSelect
            placeholder={{ label: 'Select a language...', value: null }}
            onValueChange={(value) => setSelectedLanguage(value)}
            items={languageOptions}
          />
          {/* Butonat Ruaj dhe Anulo për zgjedhjen e gjuhës */}
          <Button title="Save" onPress={handleSelectLanguage} />
          <Button title="Cancel" onPress={handleCloseLanguageModal} />
        </View>
      </Modal>
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
    height: 8, 
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16, // Vendos hapsir mes Delete Account dhe Dark Mode
  },
  settingLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  buttonContainer: {
    width: '100%', 
  },
  button: {
    width: '100%', 
    borderRadius: 8, 
  },
});


export default SettingsScreen;
