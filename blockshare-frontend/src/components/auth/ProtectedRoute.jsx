import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  // Check if the user is logged in or the local storage indicates isLoggedIn
  const isAuthenticated = isLoggedIn || JSON.parse(localStorage.getItem('isLoggedIn'));

  if (isAuthenticated) {
    // If authenticated, render the child components
    return <Outlet />;
  } else {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
