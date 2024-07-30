import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomPopup from './CustomPopup';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SensorRegistration = ({ navigation }) => {
  const [sensorUid, setSensorUid] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const registerSensor = () => {
    if (sensorUid.length === 0 || sensorType.length === 0) {
      setMessage('Please fill all fields');
      setIsPopupVisible(true);
      return;
    }

    const data = { sensorUid, sensorType };

    fetch('http://192.168.1.116/CAPSTONE/api/register-sensor.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.input}
          value={sensorUid}
          onChangeText={setSensorUid}
          placeholder="Sensor UID"
        />
        <Text style={styles.label}>Sensor Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sensorType}
            style={styles.picker}
            onValueChange={(itemValue) => setSensorType(itemValue)}
          >
            <Picker.Item label="pH" value="pH" />
            <Picker.Item label="Temperature" value="Temperature" />
          </Picker>
        </View>
      </ScrollView>
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
  pickerContainer: {
    borderColor: '#b0bec5',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#0277bd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SensorRegistration;
