import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#B0E0E6',
    height: 45, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // This will work
  },
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
