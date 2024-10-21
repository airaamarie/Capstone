import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importing Picker from the correct package
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const WaterPump = ({ navigation }) => {
  const [isOn, setIsOn] = useState(false);
  const [pumpUid, setPumpUid] = useState('');
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    // Fetch the list of water pumps from the API
    axios.get('https://sba-com.preview-domain.com/api/water_pumps.php')
      .then(response => {
        if (response.data.success) {
          setPumps(response.data.data);
          if (response.data.data.length > 0) {
            setPumpUid(response.data.data[0].pump_uid);
            setIsOn(response.data.data[0].status === 'on');
          }
        } else {
          Alert.alert('Error', 'Failed to fetch water pumps.');
        }
      })
      .catch(error => {
        console.error('Error fetching water pumps:', error);
        Alert.alert('Error', 'Failed to fetch water pumps.');
      });
  }, []);

  const handleToggle = () => {
    const newStatus = !isOn;
    // Update the water pump status in the API
    axios.post('https://sba-com.preview-domain.com/api/update_water_pump_status.php', {
      pump_uid: pumpUid,
      status: newStatus ? 'on' : 'off'
    })
    .then(response => {
      if (response.data.success) {
        setIsOn(newStatus);
        Alert.alert('Success', `Water Pump is now ${newStatus ? 'ON' : 'OFF'}`);
      } else {
        Alert.alert('Error', 'Failed to update the water pump status.');
      }
    })
    .catch(error => {
      console.error('Error controlling water pump:', error);
      Alert.alert('Error', 'Failed to update the water pump status.');
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Water Pump Control</Text>
      <TouchableOpacity 
        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]} 
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>{isOn ? 'Turn OFF' : 'Turn ON'}</Text>
      </TouchableOpacity>
      <Text style={styles.status}>{`Water Pump is ${isOn ? 'ON' : 'OFF'}`}</Text>

      {/* Picker for PUMP_UID */}
      <Picker
        selectedValue={pumpUid}
        style={styles.picker}
        onValueChange={(itemValue) => {
          const selectedPump = pumps.find(pump => pump.pump_uid === itemValue);
          if (selectedPump) {
            setPumpUid(itemValue);
            setIsOn(selectedPump.status === 'on');
          }
        }}
      >
        {pumps.map(pump => (
          <Picker.Item key={pump.pump_uid} label={`Pump ${pump.pump_uid}`} value={pump.pump_uid} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#B0E0E6',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#004d40',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonOn: {
    backgroundColor: '#d32f2f',
  },
  buttonOff: {
    backgroundColor: '#388e3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    color: '#004d40',
    marginTop: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '80%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#004d40',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default WaterPump;
