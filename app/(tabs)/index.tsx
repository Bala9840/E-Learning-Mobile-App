import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import LoginPage from '@/components/login/LoginPage';
import RegisterPage from '@/components/register/RegisterPage';
import ForgotPasswordPage from '@/components/login/ForgotPasswordPage';
import HomeScreen from '@/components/CourseDashboard/HomeScreen';
import { useAuth } from '@/context/AuthContext';

export default function IndexPage() {
  const { user, login, logout } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  console.log('IndexPage Render. User:', user);


  useEffect(() => {
    const backAction = () => {
      if (user) {
        // If logged in, back button triggers logout (as per previous behavior)
        logout();
        return true;
      }
      if (isRegister) {
        setIsRegister(false);
        return true;
      }
      if (isForgotPassword) {
        setIsForgotPassword(false);
        return true;
      }
      return false; // Default behavior (exit app) if at login
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [user, isRegister, isForgotPassword]);

  if (user) {
    return <HomeScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      {isRegister ? (
        <RegisterPage onNavigateToLogin={() => setIsRegister(false)} />
      ) : isForgotPassword ? (
        <ForgotPasswordPage onNavigateToLogin={() => setIsForgotPassword(false)} />
      ) : (
        <LoginPage
          onNavigateToRegister={() => setIsRegister(true)}
          onNavigateToForgotPassword={() => setIsForgotPassword(true)}
          onLoginSuccess={(u) => login(u)}
        />
      )}
    </View>
  );
}
