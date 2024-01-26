// /src/contexts/AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
};

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

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    dispatch({ type: 'LOGIN' });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const deleteAccount = () => {
    dispatch({ type: 'DELETE_ACCOUNT' });
    // Additional logic for deleting the account (e.g., making an API request)
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

