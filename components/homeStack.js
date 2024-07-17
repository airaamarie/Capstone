import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../comp/Login/login';
import SignUp from '../comp/Signup/signup';
import Home from '../comp/Home/home';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: true, // Hide the header for all screens in this navigator
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default HomeStack;
