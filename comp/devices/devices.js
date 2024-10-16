import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Devices = () => {
  const navigation = useNavigation();

  const menuItems = [
    { id: '1', title: 'Water Pump', screen: 'WaterPump' },
    { id: '2', title: 'Feeder', screen: 'Feeding' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Automated Devices</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#fff', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    flexGrow: 1,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#004d40', 
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Devices;
