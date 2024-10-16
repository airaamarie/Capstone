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
import AddServoTiming from '../comp/feeding/add';
import SensorRegistration from '../comp/sensor/sensor';
import ServoRegistration from '../comp/servo/servo';
import FishTankRegistration from '../comp/tank/fishtank';
import TankRegistration from '../comp/Tank_Comp/components';
import Feeding from '../comp/feeding/feeding';
import WaterPump from '../comp/devices/waterpump';
import Ammonia from '../comp/Reports/Ammonia';
import CustomHeader from '../components/CustomHeader'; // Import your custom header

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: true,
        header: () => <CustomHeader />, // Use your custom header
        headerTintColor: '#000', // Optional: Set tint color for back button and other items
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
      <Stack.Screen name="Ammonia" component={Ammonia} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="AddServoTiming" component={AddServoTiming} />
      <Stack.Screen name="SensorRegistration" component={SensorRegistration} />
      <Stack.Screen name="ServoRegistration" component={ServoRegistration} />
      <Stack.Screen name="FishTankRegistration" component={FishTankRegistration} />
      <Stack.Screen name="TankRegistration" component={TankRegistration} />
      <Stack.Screen name="Feeding" component={Feeding} />
      <Stack.Screen name="WaterPump" component={WaterPump} />
    </Stack.Navigator>
  );
};

export default HomeStack;
