import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../comp/Login/login';
import SignUp from '../comp/Signup/signup';
import Home from '../comp/Home/home'; 
import Parameters from '../comp/guide/parameters'; 
import Food from '../comp/guide/food';
import UserManual from '../comp/guide/usermanual'; 
import Tips from '../comp/guide/tips'; 
import Temperature from '../comp/Reports/temperature';
import PH from '../comp/Reports/pH';
import Edit from '../comp/feeding/edit';
import AddFeeding from '../comp/feeding/add';

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
      <Stack.Screen name="Parameters" component={Parameters} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="UserManual" component={UserManual} />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="Temperature" component={Temperature} />
      <Stack.Screen name="PH" component={PH} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="AddFeeding" component={AddFeeding} />

    </Stack.Navigator>
  );
};

export default HomeStack;
