// WaterPump.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WaterPump = () => {
  const [isOn, setIsOn] = useState(false);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsOn(prevState => !prevState);
    // Add your logic to control the water pump here
    if (!isOn) {
      console.log('Water Pump is now ON');
    } else {
      console.log('Water Pump is now OFF');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Water Pump Control</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]} 
          onPress={handleToggle}
        >
          <Text style={styles.buttonText}>{isOn ? 'Turn OFF' : 'Turn ON'}</Text>
        </TouchableOpacity>
        <Text style={styles.status}>{`Water Pump is ${isOn ? 'ON' : 'OFF'}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#0277bd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    alignSelf: 'center',
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: '#004d40',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonOn: {
    backgroundColor: '#d32f2f',
  },
  buttonOff: {
    backgroundColor: '#388e3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    color: '#004d40',
    marginTop: 20,
  },
});

export default WaterPump;
