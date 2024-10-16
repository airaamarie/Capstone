import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CustomPopup from './CustomPopup';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const SensorRegistration = ({ navigation }) => {
  const [sensorUid, setSensorUid] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [sensorTypes, setSensorTypes] = useState([
    { label: 'pH', value: 'pH' },
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Ammonia', value: 'Ammonia' }
  ]);

  const registerSensor = () => {
    if (sensorUid.length === 0 || sensorType.length === 0) {
      setMessage('Please fill all fields');
      setIsPopupVisible(true);
      return;
    }

    const data = { sensorUid, sensorType };

    fetch('http://192.168.101.76/CAPSTONE/api/register-sensor.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        setMessage(response.Message);
        setIsPopupVisible(true);
      })
      .catch(error => {
        setMessage('Error: ' + error);
        setIsPopupVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Register Sensor</Text>
      </View>
      <FlatList
        data={[{ key: 'sensorUid' }, { key: 'sensorType' }]}
        renderItem={({ item }) => {
          if (item.key === 'sensorUid') {
            return (
              <TextInput
                style={styles.input}
                value={sensorUid}
                onChangeText={setSensorUid}
                placeholder="Sensor UID"
              />
            );
          } else if (item.key === 'sensorType') {
            return (
              <View>
                <Text style={styles.label}>Sensor Type</Text>
                <DropDownPicker
                  open={open}
                  value={sensorType}
                  items={sensorTypes}
                  setOpen={setOpen}
                  setValue={setSensorType}
                  setItems={setSensorTypes}
                  placeholder="Select Sensor Type"
                  style={styles.dropdown}
                  dropDownStyle={styles.dropdown}
                />
              </View>
            );
          }
          return null;
        }}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollView}
      />

      <TouchableOpacity style={styles.saveButton} onPress={registerSensor}>
        <Text style={styles.saveButtonText}>Register Sensor</Text>
      </TouchableOpacity>

      <CustomPopup
        isVisible={isPopupVisible}
        message={message}
        onClose={() => setIsPopupVisible(false)}
      />
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#b0bec5',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#004d40',
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#b0bec5',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    height: 40,
  },
  saveButton: {
    backgroundColor: '#0277bd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20, // Added margin bottom
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SensorRegistration;
