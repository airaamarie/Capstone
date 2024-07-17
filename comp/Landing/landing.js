import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import * as Font from 'expo-font';


const SeniorAssistance = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content}>
          <View style={styles.logoWrapper} />
        </View>
      </View>
      <Image 
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6d939a1c0dba649d4035ee5f9929206be6bc9cff42049ef0be93fbc1eebe65dc?apiKey=a26f244406ed4850866496942a6946ee&' }} 
        style={styles.logo} 
        accessibilityLabel="Senior Needs Assistance Logo"
      />
      <Text style={styles.title}>Senior Needs Assistance</Text>
      <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>      
        <Image 
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fe790a8658316e0b01791b37070b7679a10f70b4bf4f666efd30d76f805913ee?apiKey=a26f244406ed4850866496942a6946ee&' }} 
          style={styles.ctaButtonBackground} 
          accessibilityLabel=""
        />
        <Text style={styles.ctaButtonText}>GET STARTED</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Welcome to the app! {'\n'}
        Monitor your health, stay connected with loved ones, {'\n'}
        and enjoy peace of mind with SENA.
      </Text>
    
    </View>
  );
};

export default SeniorAssistance;
