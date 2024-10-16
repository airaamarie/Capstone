import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import styles from './style';
import Guideline from '../guide/guideline';
import Reports from '../Reports/reports';
import ThermometerIcon from '../../assets/thermometer.png';
import AnalyticsIcon from '../../assets/ph.png';
import AmmoniaIcon from '../../assets/ammonia.png';
import Profile from '../profile/profile';
import Registration from '../registration/registration';
import Devices from '../devices/devices';
import FilterIcon from '../../assets/filter.png';

const Drawer = createDrawerNavigator();

const DashboardScreen = ({ filter, onFilterChange }) => {
  const [data, setData] = useState({
    temperature: 0,
    ph: 0,
    ammonia: 0,
  });

  const filterData = (filter) => {
    switch (filter) {
      case 'high':
        return { temperature: 30, ph: 8.0, ammonia: 1.0 };
      case 'low':
        return { temperature: 25, ph: 6.5, ammonia: 0.2 };
      case 'default':
        return { temperature: 28, ph: 7.2, ammonia: 0.5 };
      default:
        return { temperature: 0, ph: 0, ammonia: 0 };
    }
  };

  const filteredData = filterData(filter);

  const pieChartData = [
    { name: 'Temp', population: filteredData.temperature, color: 'rgba(255, 99, 132, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'pH', population: filteredData.ph, color: 'rgba(255, 206, 86, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Ammonia', population: filteredData.ammonia, color: 'rgba(75, 192, 192, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['Temperature', 'pH', 'Ammonia'],
    datasets: [
      {
        data: [filteredData.temperature, filteredData.ph, filteredData.ammonia],
      },
    ],
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Adjusted Filter Button */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Filter Data',
              'Choose a filter option',
              [
                { text: 'Tank 1', onPress: () => onFilterChange('high') },
                { text: 'Tank 2', onPress: () => onFilterChange('low') },
                { text: 'Tank 3', onPress: () => onFilterChange('default') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          }}
          style={styles.filterButtonContainer}
        >
          <Image source={FilterIcon} style={styles.filterIcon} />
          <View style={styles.filterTextContainer}>
            <Text style={styles.filterButtonText}>Filter</Text>
            <Text style={styles.filterSubText}>Choose a tank</Text>
          </View>
        </TouchableOpacity>

        <SensorCard
          sensorName="Temperature"
          sensorData={filteredData.temperature}
          icon={<Image source={ThermometerIcon} style={styles.sensorIcon} />}
        />
        <SensorCard
          sensorName="pH"
          sensorData={filteredData.ph}
          icon={<Image source={AnalyticsIcon} style={styles.sensorIcon} />}
        />
        <SensorCard
          sensorName="Ammonia"
          sensorData={filteredData.ammonia}
          icon={<Image source={AmmoniaIcon} style={styles.sensorIcon} />}
        />

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sensors Data (Pie Chart)</Text>
          <PieChart
            data={pieChartData}
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
            data={barChartData}
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
