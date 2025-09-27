import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './app/login-simple';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <LoginScreen />
    </>
  );
}
