import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../comp/Login/login';
import SignUp from '../comp/Signup/signup';
import Home from '../comp/Home/home';
import Guideline from '../comp/guide/guideline'; // Import Guideline component
import Parameters from '../comp/guide/parameters'; // Import Parameters component
import Food from '../comp/guide/food'; // Import Food component
import UserManual from '../comp/guide/usermanual'; // Import User Manual component
import Tips from '../comp/guide/tips'; // Import Tips component
import Reports from '../comp/Reports/reports';
import Temperature from '../comp/Reports/temperature';
import PH from '../comp/Reports/pH';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Guideline" component={Guideline} />
      <Stack.Screen name="Parameters" component={Parameters} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="UserManual" component={UserManual} />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="Temperature" component={Temperature} />
      <Stack.Screen name="PH" component={PH} />
    </Stack.Navigator>
  );
};

export default HomeStack;
