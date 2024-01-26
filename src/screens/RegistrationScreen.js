// /src/screens/RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignUp = async () => {
    // Implement your sign-up logic here
    // You can use the collected data (username, email, password, phoneNumber) for registration
    // For example, you can call an API to register the user

    // Show a success message and update state
    setRegistrationSuccess(true);

    // You may want to reset the input fields after successful registration
    setUsername('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const handleContinue = () => {
    // Navigate back to LoginSignupScreen
    navigation.navigate('LoginSignup');
  };

  return (
    <View style={styles.container}>
      {registrationSuccess ? (
        <View style={styles.successContainer}>
          <Text style={styles.successMessage}>You are successfully registered!</Text>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      ) : (
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
