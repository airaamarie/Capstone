import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

const Edit = ({ route, navigation }) => {
  const { item } = route.params;
  const [servoUid, setServoUid] = useState(item.servo_uid);
  const [time, setTime] = useState(item.time);
  const [status, setStatus] = useState(item.status);
  const [statusOpen, setStatusOpen] = useState(false);

  const handleSave = () => {
    const updatedItem = { ...item, servo_uid: servoUid, time, status };

    fetch('http://192.168.1.12/CAPSTONE/api/updateServoTiming.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Alert.alert('Success', 'Servo timing updated successfully');
          navigation.navigate('Feeding', { updatedItem });
        } else {
          Alert.alert('Error', 'Failed to update servo timing');
        }
      })
      .catch(error => {
        console.error('Error updating servo timing:', error);
        Alert.alert('Error', 'Failed to update servo timing');
      });
  };

  // List of form items
  const formItems = [
    { id: '1', component: (
      <TextInput
        style={styles.input}
        value={servoUid}
        onChangeText={setServoUid}
        placeholder="Servo UID"
      />
    )},
    { id: '2', component: (
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Time"
      />
    )},
    { id: '3', component: (
      <View>
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
    )},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Servo Timing</Text>
      </View>
      <FlatList
        data={formItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => item.component}
        contentContainerStyle={styles.scrollView}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
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
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
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

export default Edit;
