import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Reports = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>REPORTS</Text>
      <TouchableOpacity style={[styles.button, styles.buttonTop]} onPress={() => navigation.navigate('Temperature')}>
        <Text style={styles.buttonText}>WATER TEMPERATURE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonBottom]} onPress={() => navigation.navigate('PH')}>
        <Text style={styles.buttonText}>pH LEVEL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonBottom]} onPress={() => navigation.navigate('Ammonia')}>
        <Text style={styles.buttonText}>AMMONIA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#B0E0E6',
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
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#004d40',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8, 
  },
  buttonTop: {
    marginTop: 50, 
  },
  buttonBottom: {
    marginTop: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reports;