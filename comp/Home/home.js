import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Guideline from '../guide/guideline';
import Reports from '../Reports/reports';
import Profile from '../profile/profile';
import Registration from '../registration/registration';
import Devices from '../devices/devices';
import FilterIcon from '../../assets/filter.png';

const Drawer = createDrawerNavigator();

const DashboardScreen = ({ filter, onFilterChange }) => {
  const [tanks, setTanks] = useState([]); // Initialize tanks as an empty array

  useEffect(() => {
    // Fetch tank data from the server
    fetch('https://sba-com.preview-domain.com/api/fetchTankNames.php')
      .then(response => response.json())
      .then(data => {
        // Check if data.tanks is an array before setting the state
        if (Array.isArray(data.tanks)) {
          setTanks(data.tanks);
        } else {
          console.error('Expected tanks to be an array but got:', data.tanks);
        }
      })
      .catch(error => console.error('Error fetching tank data:', error));
  }, []);

  const handleFilterChange = (tankValue) => {
    onFilterChange(tankValue);
    // Fetch tank data or perform other actions as needed
  };

  const showFilterOptions = () => {
    const options = tanks.map(tank => ({
      text: tank.label, // Display tank labels
      onPress: () => handleFilterChange(tank.value), // Use the tank value for filtering
    }));

    options.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('Filter Data', 'Choose a tank to filter', options);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Adjusted Filter Button */}
        <TouchableOpacity
          onPress={showFilterOptions} // Call the showFilterOptions function
          style={styles.filterButtonContainer}
        >
          <Image source={FilterIcon} style={styles.filterIcon} />
          <View style={styles.filterTextContainer}>
            <Text style={styles.filterButtonText}>FILTER</Text>
            <Text style={styles.chooseTankText}>Choose a tank</Text>
          </View>
        </TouchableOpacity>

        {/* Sensor Cards */}
        <SensorCard sensorName="Temperature" sensorData={0} icon={<Image source={require('../../assets/thermometer.png')} style={styles.sensorIcon} />} />
        <SensorCard sensorName="pH" sensorData={0} icon={<Image source={require('../../assets/ph.png')} style={styles.sensorIcon} />} />
        <SensorCard sensorName="Ammonia" sensorData={0} icon={<Image source={require('../../assets/ammonia.png')} style={styles.sensorIcon} />} />

        {/* Charts */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sensors Data (Pie Chart)</Text>
          <PieChart
            data={[]} // Use your actual data here
            width={Dimensions.get('window').width - 78}
            height={180}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sensors Data (Bar Graph)</Text>
          <BarChart
            style={{ marginVertical: 8, borderRadius: 16 }}
            data={{
              labels: ['Temperature', 'pH', 'Ammonia'],
              datasets: [{ data: [0, 0, 0] }], // Use your actual data here
            }}
            width={Dimensions.get('window').width - 48}
            height={180}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            verticalLabelRotation={0}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const SensorCard = ({ sensorName, sensorData, icon }) => (
  <View style={[styles.sensorCard, styles.cardContainer]}>
    <View style={styles.sensorText}>
      <Text style={styles.sensorName}>{sensorName}</Text>
      <Text style={styles.sensorData}>{sensorData}</Text>
    </View>
    <View style={styles.sensorIcon}>{icon}</View>
  </View>
);

const handleLogout = (navigation) => {
  Alert.alert("Logout", "You have been logged out.");
  navigation.navigate('SignIn');
};

const CustomSidebar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Dashboard')}>
        <Image source={require('../../assets/dashboard.png')} style={styles.dashboardImage} />
        <Text style={styles.sidebarText}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Reports')}>
        <Image source={require('../../assets/report.png')} style={styles.reportImage} />
        <Text style={styles.sidebarText}>Reports</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Devices')}>
        <Image source={require('../../assets/time.png')} style={styles.feedImage} />
        <Text style={styles.sidebarText}>Devices</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../../assets/profile-user.png')} style={styles.profileImage} />
        <Text style={styles.sidebarText}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('GuideLine')}>
        <Image source={require('../../assets/user-guide.png')} style={styles.guideImage} />
        <Text style={styles.sidebarText}>Guide</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Registration')}>
        <Image source={require('../../assets/add.png')} style={styles.sensorImage} />
        <Text style={styles.sidebarText}>Registration</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleLogout(navigation)}>
        <Image source={require('../../assets/logout.png')} style={styles.logoutImage} />
        <Text style={styles.sidebarText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const [filter, setFilter] = useState('');

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={() => <CustomSidebar />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4C9A2A',
          height: 80,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      <Drawer.Screen name="Dashboard">
        {() => <DashboardScreen filter={filter} onFilterChange={setFilter} />}
      </Drawer.Screen>
      <Drawer.Screen name="Reports" component={Reports} />
      <Drawer.Screen name="Devices" component={Devices} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="GuideLine" component={Guideline} />
      <Drawer.Screen name="Registration" component={Registration} />
    </Drawer.Navigator>
  );
}
