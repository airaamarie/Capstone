import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddServoTiming = () => {
  const [date] = useState(getCurrentDate());
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('Active');
  const [servoUid, setServoUid] = useState('');
  const [servoUids, setServoUids] = useState([]);
  const [open, setOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.12/CAPSTONE/api/fetchServoUids.php')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Servo UIDs:', data);
        if (data.servoUids) {
          setServoUids(data.servoUids.map(uid => ({ label: uid, value: uid })));
        } else {
          console.error('No servo UIDs found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching servo UIDs:', error);
      });
  }, []);

  const handleSave = () => {
    console.log('Servo UID:', servoUid);

    if (!servoUid) {
      console.error('Please select a Servo UID.');
      return;
    }

    const newEntry = { servoUid, time, date, status };

    fetch('http://192.168.1.12/CAPSTONE/api/addServoTiming.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data);
      if (data.Message) {
        console.log(data.Message);
        navigation.navigate('Feeding', { newEntry });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Servo Timing</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={date}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Time (HH:MM)"
        />
        <Text style={styles.label}>Servo UID</Text>
        <DropDownPicker
          open={open}
          value={servoUid}
          items={servoUids}
          setOpen={setOpen}
          setValue={setServoUid}
          setItems={setServoUids}
          placeholder="Select a Servo UID"
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
        />
        <Text style={styles.label}>Status</Text>
        <DropDownPicker
          open={statusOpen}
          value={status}
          items={[
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' }
          ]}
          setOpen={setStatusOpen}
          setValue={setStatus}
          placeholder="Select Status"
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
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
  formContainer: {
    flex: 1,
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
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold',
  },
});

export default AddServoTiming;
