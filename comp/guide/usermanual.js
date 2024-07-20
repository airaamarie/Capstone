// Parameters.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserManual = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parameters Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserManual;
