import React, { createContext, useContext, useState } from 'react';
import AuthService from '../../services/AuthService';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application and provide authentication functionality
export const AuthProvider = ({ children }) => {
  // State to hold information about the authenticated user and Ethereum address
  const [user, setUser] = useState(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [ethereumAddress, setEthereumAddress] = useState(() => {
    // Check if Ethereum address exists in local storage
    const storedAddress = localStorage.getItem('ethereum_address');
    return storedAddress ? storedAddress : null;
  });
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if login status exists in local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  });

  // Function to handle user login
  const login = async (username, password) => {
    try {
      // Call the login function from AuthService
      const response = await AuthService.login(username, password);

      console.log('Login response:', response);

      // Check if login was successful
      if (response && response.success) {
        // Set the user, Ethereum address, and login status
        setUser(response.user);
        setEthereumAddress(response.user.account_address);
        setIsLoggedIn(true);

        console.log('Login successful:', response.user.account_address);

        // Store user data, Ethereum address, and login status in local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('ethereum_address', response.user.account_address);
        localStorage.setItem('isLoggedIn', true);

        return true; // Return true indicating successful login
      } else {
        console.error('Login failed:', response && response.message);
        return false; // Return false indicating failed login
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      return false; // Return false indicating failed login
    }
  };

  // Function to handle user logout
  const logout = async () => {
    // Display a confirmation dialog before logging out
    const confirmed = window.confirm('Are you sure you want to logout?');
    
    if (confirmed) {
      // Clear user data, Ethereum address, and login status from local storage
      localStorage.removeItem('user');
      // localStorage.removeItem('ethereum_address');
      localStorage.removeItem('isLoggedIn');

      // Update the user state, Ethereum address state, and login status state
      setUser(null);
      setEthereumAddress(null);
      setIsLoggedIn(false);
    }
  };

  // Value to be provided by the context
  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    ethereumAddress
  };

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
