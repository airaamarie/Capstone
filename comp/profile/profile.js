import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const defaultImage = require('../../assets/avatar.png');

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    console.log('Saved:', { name, phoneNumber });
    navigation.goBack();
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('Image selection canceled');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePicContainer}>
          <Image
            source={image ? { uri: image } : defaultImage}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>Edit Profile</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cardo Dalisay"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="12345678"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjusted to start content from the top
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 0, // No bottom margin
    marginTop: 20, // Adjusted top margin
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#004d40',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10, // Reduced margin bottom
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#004d40',
    padding: 8,
    borderRadius: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 10, // Reduced margin bottom
  },
  form: {
    width: '100%',
    marginBottom: 20, // Reduced margin bottom
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b0bec5',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#004d40',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
