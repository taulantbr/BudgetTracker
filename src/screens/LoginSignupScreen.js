import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Import your logo image from the correct relative path
const LogoImage = require('../../assets/OIG2.jpg');

const LoginSignupScreen = ({ navigation }) => {
  const { isAuthenticated, login, signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform your actual login logic here
    // For now, we'll just simulate a successful login
    login();

    // Navigate to the home screen after successful login
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    // If not authenticated, navigate to RegistrationScreen
    if (!isAuthenticated) {
      navigation.navigate('RegistrationScreen');
    } else {
      // Implement any logic you want when the user is already authenticated
      navigation.navigate('Home'); // or navigate to another screen as needed
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo section */}
      <View style={styles.logoContainer}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.welcomeText}>
          Welcome to the App! Please log in or sign up to continue.
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Login and Signup form */}
        {!isAuthenticated ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <TouchableHighlight
              style={styles.button}
              onPress={handleLogin}
              underlayColor="#007BFF"
            >
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={handleSignUp}
              underlayColor="#007BFF"
            >
              <View>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableHighlight>
          </>
        ) : (
          <Text style={styles.loggedInText}>You are already logged in!</Text>
        )}
      </View>
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
  logoContainer: {
    marginBottom: 16,
    alignItems: 'center', // Center the content horizontally
  },
  logo: {
    width: 300, // Set the desired width for the logo
    height: 300, // Set the desired height for the logo
    resizeMode: 'contain', // Adjust the image content mode as needed
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center', // Center the text
  },
  formContainer: {
    marginTop: 20, // Add space between logo and the form
    width: '100%', // Ensure the form takes the full width
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#007BFF', // You can customize the background color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%', // Ensures the button takes up the full width
    borderRadius: 5, // Optional: Adds rounded corners to the button
  },
  buttonText: {
    color: 'white', // You can customize the text color
  },
  loggedInText: {
    fontSize: 18,
    color: 'green',
    marginTop: 16,
  },
});

export default LoginSignupScreen;













