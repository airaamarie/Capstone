import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Edit = ({ route, navigation }) => {
  const { item } = route.params;
  const [date, setDate] = useState(item.date);
  const [time, setTime] = useState(item.time);
  const [status, setStatus] = useState(item.status);

  const handleSave = () => {
    const updatedItem = { ...item, date, time, status };
    navigation.navigate('Feeding', { updatedItem });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Feeding Time</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Date"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Time"
        />
        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Active" value="Active" />
          <Picker.Item label="Inactive" value="Inactive" />
        </Picker>
      </ScrollView>
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
  picker: {
    height: 40,
    width: '100%',
    borderColor: '#b0bec5',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
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
