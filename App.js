import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

// Komponenti kryesor i aplikacionit
const App = () => {
  return (
    // Mbështilleni të gjithë aplikacionin me AuthProvider për menaxhimin e gjendjes së authentication
    <AuthProvider>
      {/* Inicializoni kontejnerin e navigimit për React Navigation */}
      <NavigationContainer>
        {/*Përdorni StackNavigator për të përcaktuar strukturën e navigimit të aplikacionit*/}
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

// Eksporto komponentin e aplikacionit si rrënjë(root) të aplikacionit
export default App;
