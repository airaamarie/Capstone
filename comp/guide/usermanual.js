import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserManual = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>User Manual</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.text}>
            Welcome to the User Manual for the Smart Backyard Aquaculture Application! This guide will assist you in setting up and utilizing the application designed for monitoring catfish culture using Arduino sensors in your backyard aquaculture setup.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.text}>- Real-time monitoring of temperature and pH levels in your fish tanks.</Text>
          <Text style={styles.text}>- Alerts for critical sensor readings (high temperature, low pH).</Text>
          <Text style={styles.text}>- Historical data logging for analysis and trends.</Text>
          <Text style={styles.text}>- User-friendly interface for easy navigation and data visualization.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Using the Application</Text>
          <Text style={styles.subSectionTitle}>Dashboard Overview</Text>
          <Text style={styles.text}>
            Upon launching the application, you will see:
          </Text>
          <Text style={styles.text}>- Dashboard: Displays current readings of temperature and pH.</Text>
          <Text style={styles.text}>- Graphs: Historical data graphs for temperature and pH levels.</Text>
          <Text style={styles.subSectionTitle}>Viewing Sensor Data</Text>
          <Text style={styles.text}>Real-time Data:</Text>
          <Text style={styles.text}>- Navigate to the Dashboard to view current sensor readings.</Text>
          <Text style={styles.text}>- Data updates automatically at regular intervals.</Text>
          <Text style={styles.text}>Historical Data:</Text>
          <Text style={styles.text}>- Access graphs to analyze trends over time.</Text>
          <Text style={styles.text}>- Zoom in/out to view specific time periods.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance</Text>
          <Text style={styles.text}>- Regular Checks:</Text>
          <Text style={styles.text}>- Inspect sensors for cleanliness and functionality.</Text>
          <Text style={styles.text}>- Calibrate sensors periodically as per manufacturer's recommendations.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.text}>
            You have successfully set up and started using the Smart Backyard Aquaculture Application to monitor your catfish culture with Arduino sensors. Regular monitoring and maintenance will ensure optimal conditions for your fish.
          </Text>
          <Text style={styles.text}>
          </Text>
          <Text style={styles.text}>
            For further assistance or feedback, please contact AIRA MARIE S. ATIENZA.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: 30,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20,
    backgroundColor: '#0277bd',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
});

export default UserManual;