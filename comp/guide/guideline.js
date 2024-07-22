import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Guideline = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Guideline</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Parameters')}>
        <Text style={styles.buttonText}>Parameters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Food')}>
        <Text style={styles.buttonText}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserManual')}>
        <Text style={styles.buttonText}>User Manual</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tips')}>
        <Text style={styles.buttonText}>Tips</Text>
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
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgb(5, 145, 66)',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Guideline;
