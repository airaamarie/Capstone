import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomPopup from './CustomPopup';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ServoRegistration = ({ navigation }) => {
  const [servoUid, setServoUid] = useState('');
  const [selectedTankId, setSelectedTankId] = useState(''); // State to hold selected tank ID
  const [tanks, setTanks] = useState([]); // State to hold available tanks
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Fetch available tanks from the API
    fetch('http://192.168.68.112/CAPSTONE/api/get-tanks.php')
      .then(response => response.json())
      .then(data => {
        setTanks(data); // Assuming data is an array of available tanks
      })
      .catch(error => {
        Alert.alert('Error', 'Unable to fetch tanks: ' + error);
      });
  }, []);

  const registerServo = () => {
    if (servoUid.length === 0 || selectedTankId.length === 0) {
      setMessage('Please fill all fields');
      setIsPopupVisible(true);
      return;
    }

    const data = { servoUid, tankId: selectedTankId }; // Use tankId instead of tankName

    fetch('http://192.168.68.112/CAPSTONE/api/register-servo.php', {
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
        <Text style={styles.headerText}>Register Servo</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.input}
          value={servoUid}
          onChangeText={setServoUid}
          placeholder="Servo UID"
        />

        <Text style={styles.label}>Select Tank</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTankId}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTankId(itemValue)}
          >
            <Picker.Item label="Select a tank" value="" />
            {tanks.map((tank) => (
              <Picker.Item key={tank.tank_id} label={tank.tank_name} value={tank.tank_id} />
            ))}
          </Picker>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={registerServo}>
        <Text style={styles.saveButtonText}>Register Servo</Text>
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
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

export default ServoRegistration;
