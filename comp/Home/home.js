import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './style';

// Function to simulate fetching heart rate data
const getHeartRate = () => {
  // Simulate a delay in fetching data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(72); // Example heart rate value
    }, 1000);
  });
};

// Function to fetch session username from API
const fetchUserName = async () => {
  try {
    const response = await fetch('http://192.168.0.234/SENA/api/login.php', {
      method: 'GET', // Use the appropriate method for your API
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials if needed
    });

    const data = await response.json();
    return data.u_name || 'Guest'; // Default to 'Guest' if no username is found
  } catch (error) {
    console.error('Error fetching username:', error);
    return 'Guest'; // Default to 'Guest' in case of an error
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heartRate: null,
      userName: 'Guest', // Default value
    };
  }

  componentDidMount() {
    this.fetchHeartRate();
    this.fetchUserName();
  }

  fetchHeartRate = async () => {
    const heartRate = await getHeartRate();
    this.setState({ heartRate });
  };

  fetchUserName = async () => {
    const userName = await fetchUserName();
    this.setState({ userName });
  };

  render() {
    const { heartRate, userName } = this.state;
    return (
      <View style={styles.view}>
        <Text style={styles.txt}>WELCOME, {userName}!</Text>
        <View style={dashboardStyles.container}>
          <Text style={dashboardStyles.label}>Heart Rate:</Text>
          <Text style={dashboardStyles.value}>
            {heartRate !== null ? `${heartRate} BPM` : 'Loading...'}
          </Text>
        </View>
      </View>
    );
  }
}

const dashboardStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 24,
    color: 'red',
  },
});
