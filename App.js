import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeStack from './components/homeStack'; // Adjust the import path as per your project structure

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
