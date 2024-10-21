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
  const [tanks, setTanks] = useState([]);
  const [sensorData, setSensorData] = useState({ temperature: 0, pH: 0, ammonia: 0 });

  useEffect(() => {
    // Fetch tank data from the server
    fetch('https://sba-com.preview-domain.com/api/fetchTankNames.php')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.tanks)) {
          setTanks(data.tanks);
        }
      })
      .catch(() => {}); // Silently handle errors
  }, []);

  useEffect(() => {
    // Fetch sensor data based on the selected tank
    if (filter) {
      fetch(`https://sba-com.preview-domain.com/api/fetchSensorData.php?tank_id=${filter}`)
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            const temperatureData = data.find(sensor => sensor.sensor_uid === 'T1');
            const ammoniaData = data.find(sensor => sensor.sensor_uid === 'A1');
            setSensorData({
              temperature: temperatureData ? temperatureData.data_value : 0,
              pH: 0,  // Set pH to 0 as specified
              ammonia: ammoniaData ? ammoniaData.data_value : 0,
            });
          } else {
            // Set sensor data to 0 if there's an error or no tank is selected
            setSensorData({ temperature: 0, pH: 0, ammonia: 0 });
          }
        })
        .catch(() => {
          setSensorData({ temperature: 0, pH: 0, ammonia: 0 }); // Reset sensor data on error
        });
    } else {
      // Reset sensor data to 0 when no filter is applied
      setSensorData({ temperature: 0, pH: 0, ammonia: 0 });
    }
  }, [filter]);

  const handleFilterChange = (tankValue) => {
    onFilterChange(tankValue);
  };

  const showFilterOptions = () => {
    const options = tanks.map(tank => ({
      text: tank.label,
      onPress: () => handleFilterChange(tank.value),
    }));

    options.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('Filter Data', 'Choose a tank to filter', options);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={showFilterOptions}
          style={styles.filterButtonContainer}
        >
          <Image source={FilterIcon} style={styles.filterIcon} />
          <View style={styles.filterTextContainer}>
            <Text style={styles.filterButtonText}>FILTER</Text>
            <Text style={styles.chooseTankText}>Choose a tank</Text>
          </View>
        </TouchableOpacity>

        {/* Sensor Cards */}
        <SensorCard sensorName="Temperature" sensorData={sensorData.temperature} icon={<Image source={require('../../assets/thermometer.png')} style={styles.sensorIcon} />} />
        <SensorCard sensorName="pH" sensorData={sensorData.pH} icon={<Image source={require('../../assets/ph.png')} style={styles.sensorIcon} />} />
        <SensorCard sensorName="Ammonia" sensorData={sensorData.ammonia} icon={<Image source={require('../../assets/ammonia.png')} style={styles.sensorIcon} />} />

        {/* Charts */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sensors Data (Pie Chart)</Text>
          <PieChart
            data={[
              { name: 'Temperature', population: sensorData.temperature, color: '#FF6384', legendFontColor: '#fff', legendFontSize: 15 },
              { name: 'pH', population: sensorData.pH, color: '#36A2EB', legendFontColor: '#fff', legendFontSize: 15 },
              { name: 'Ammonia', population: sensorData.ammonia, color: '#FFCE56', legendFontColor: '#fff', legendFontSize: 15 },
            ]}
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
              datasets: [{ data: [sensorData.temperature, sensorData.pH, sensorData.ammonia] }],
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
  const [selectedTank, setSelectedTank] = useState(null);

  return (
    <Drawer.Navigator
      drawerContent={() => <CustomSidebar />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#B0E0E6', // Set your custom header color here
        },
        headerTintColor: '#000', // Color of header text
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen name="Dashboard">
        {() => <DashboardScreen filter={selectedTank} onFilterChange={setSelectedTank} />}
      </Drawer.Screen>
      <Drawer.Screen name="Reports" component={Reports} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="GuideLine" component={Guideline} />
      <Drawer.Screen name="Registration" component={Registration} />
      <Drawer.Screen name="Devices" component={Devices} />
    </Drawer.Navigator>
  );
}
