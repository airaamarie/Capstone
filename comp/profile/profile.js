import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(require('../../assets/avatar.png')); 

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      setProfilePic({ uri: response.assets[0].uri });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePicContainer}>
          <Image source={profilePic} style={styles.profilePic} />
          <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>PROFILE</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cardo Dalisay"
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="12345678"
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa', 
    alignItems: 'center', 
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, 
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#004d40', 
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
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
  },
  form: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20, 
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
