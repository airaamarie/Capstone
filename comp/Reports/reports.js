import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Reports = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>REPORTS</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>WATER TEMPERATURE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>pH LEVEL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 16, // Adjusted margin bottom
    marginTop: 16, // Add margin top if needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16, // Adjusted margin bottom
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgb(5, 145, 66)', // Updated to use RGB color
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12, // Adjusted margin bottom
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reports;
