import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CustomPopup from './CustomPopup';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ServoRegistration = ({ navigation }) => {
  const [servoUid, setServoUid] = useState('');
  const [waterPumpUid, setWaterPumpUid] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const registerDevices = () => {
    if (servoUid.length === 0 || waterPumpUid.length === 0) {
      setMessage('Please fill all fields');
      setIsPopupVisible(true);
      return;
    }

    const data = { servoUid, waterPumpUid };

    fetch('https://sba-com.preview-domain.com/api/register-devices.php', {
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
        <Text style={styles.headerText}>Register Devices</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.input}
          value={servoUid}
          onChangeText={setServoUid}
          placeholder="Feeder UID"
        />
        <TextInput
          style={styles.input}
          value={waterPumpUid}
          onChangeText={setWaterPumpUid}
          placeholder="Water Pump UID"
        />
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={registerDevices}>
        <Text style={styles.saveButtonText}>Register Devices</Text>
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
