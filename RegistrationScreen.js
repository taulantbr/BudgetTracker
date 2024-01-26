import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  // Variablat për të menaxhuar hyrjen e përdoruesit dhe statusin e regjistrimit
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Trajtimi i user sign-up
  const handleSignUp = async () => {
    // Ketu mund te implementohet logjika per signup

    // Shfaq një mesazh suksesi dhe gjendjen e përditësimit
    setRegistrationSuccess(true);

    // Ju mund të rivendosni fushat e hyrjes pas regjistrimit të suksesshëm
    setUsername('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  // Trajtimi i navigimit tek  LoginSignupScreen
  const handleContinue = () => {
    navigation.navigate('LoginSignup');
  };

  return (
    <View style={styles.container}>
      {/* Shfaq mesazhin e suksesit dhe butonin vazhdo nëse regjistrimi është i suksesshëm */}
      {registrationSuccess ? (
        <View style={styles.successContainer}>
          <Text style={styles.successMessage}>You are successfully registered!</Text>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      ) : (
        {/* Shfaq formen e signup nëse regjistrimi nuk është ende i suksesshëm */}
        <>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number (optional)"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
          <Button title="Sign Up Now" onPress={handleSignUp} />
        </>
      )}
    </View>
  );
};

// Stilimi i komponeteve
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
  successContainer: {
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default RegistrationScreen;
