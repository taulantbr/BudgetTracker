import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Importimi i imazhit të logos nga rruga e duhur relative
const LogoImage = require('../../assets/OIG2.jpg');

const LoginSignupScreen = ({ navigation }) => {
  // Hyni në kontekstin e autotenfikimit
  const { isAuthenticated, login, signup } = useAuth();
  
  // Variablat për të menaxhuar futjen e emrit të përdoruesit dhe fjalëkalimit
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Trajtoni shtypjen e login button
  const handleLogin = () => {
    // Kryeni logjikën tuaj aktuale të login këtu
    // Tani për tani, ne thjesht do të simulojmë një login të suksesshem
    login();

    // Navigoni në ekranin Home pas login të suksesshme
    navigation.navigate('Home');
  };

  // Trajtoni butonin signup 
  const handleSignUp = () => {
    // Nëse nuk është autotenfikuar, vazhdoni te RegistrationScreen
    if (!isAuthenticated) {
      navigation.navigate('RegistrationScreen');
    } else {
      // Zbatoni çdo logjikë që dëshironi kur përdoruesi është tashmë eshte authenticated
      navigation.navigate('Home'); //ose vazhdoni në një ekran tjetër sipas nevojës
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo  */}
      <View style={styles.logoContainer}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.welcomeText}>
          Welcome to the App! Please log in or sign up to continue.
        </Text>
      </View>

      {/* Forma Login and Signup */}
      <View style={styles.formContainer}>
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

// Stilimi per komponentet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: 'center', // Përqendroni përmbajtjen horizontalisht
  },
  logo: {
    width: 300, // Vendosni gjerësinë e dëshiruar për logon
    height: 300, // Vendosni lartësinë e dëshiruar për logon
    resizeMode: 'contain', // Rregulloni modalitetin e përmbajtjes së imazhit sipas nevojës
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center', // Vendos textin ne qender
  },
  formContainer: {
    marginTop: 20, // Shtoni hapësirë ​​midis logos dhe formes
    width: '100%', // Siguron që forma të ketë gjerësinë e plotë
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
    backgroundColor: '#007BFF', // Ju mund të personalizoni ngjyrën e sfondit
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%', // Siguron që butoni të marrë gjerësinë e plotë
    borderRadius: 5, // Opsionale: Shton kënde të rrumbullakosura te butonit
  },
  buttonText: {
    color: 'white', // Ngjyra e tekstit ne buton
  },
  loggedInText: {
    fontSize: 18,
    color: 'green',
    marginTop: 16,
  },
});

export default LoginSignupScreen;
