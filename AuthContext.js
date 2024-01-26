import React, { createContext, useContext, useReducer } from 'react';
import { Alert } from 'react-native';

// Krijimi i një konteksti për authentication
const AuthContext = createContext();

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
};

// Funksioni i reduktuesit për të trajtuar ndryshimet e gjendjes bazuar në veprime
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'DELETE_ACCOUNT':
      return { ...initialState }; // Reset to initial state on account deletion
    default:
      return state;
  }
};

// Komponenti AuthProvider për të menaxhuar gjendjen e authentication
const AuthProvider = ({ children }) => {
  // Përdorni authReducer për të menaxhuar ndryshimet e gjendjes
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Veprimi për të trajtuar hyrjen e përdoruesit
  const login = () => {
    dispatch({ type: 'LOGIN' });
  };

  // Veprim për të trajtuar daljen e përdoruesit
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Veprim për të trajtuar fshirjen e llogarisë
  const deleteAccount = () => {
    dispatch({ type: 'DELETE_ACCOUNT' });
    // Logjikë shtesë për fshirjen e llogarisë (p.sh., duke bërë një kërkesë API)
  };

  // Siguroni gjendjen dhe veprimet e authentication përmes kontekstit
  return (
    <AuthContext.Provider value={{ ...state, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Lidhje e kustomizuar për të hyrë lehtësisht në kontekstin e vërtetimit
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Eksportoni AuthProvider dhe useAuth për përdorim në komponentë të tjerë
export { AuthProvider, useAuth };

