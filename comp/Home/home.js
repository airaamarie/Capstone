import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import styles from './style'; // Import your updated styles
import Guideline from '../guide/guideline';
import Reports from '../Reports/reports';
import ThermometerIcon from '../../assets/thermometer.png';
import AnalyticsIcon from '../../assets/ph.png';

const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  const pieChartData = [
    { name: 'Temperature', population: 28, color: 'rgba(255, 99, 132, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'pH', population: 7.2, color: 'rgba(255, 206, 86, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['Temperature', 'pH'],
    datasets: [
      {
        data: [32, 6.5], // Updated dummy data without DO
      },
    ],
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <SensorCard
          sensorName="Temperature"
          sensorData="28"
          icon={<Image source={ThermometerIcon} style={styles.sensorIcon} />}
        />
        <SensorCard
          sensorName="pH"
          sensorData="7.2"
          icon={<Image source={AnalyticsIcon} style={styles.sensorIcon} />}
        />

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sensors Data (Pie Chart)</Text>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - 32}
            height={220}
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
            width={Dimensions.get('window').width - 32}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            verticalLabelRotation={30}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ReportsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('WaterTemperature')}>
        <Text style={styles.sidebarText}>Temperature Sensor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('PhLevel')}>
        <Text style={styles.sidebarText}>pH Sensor</Text>
      </TouchableOpacity>
    </View>
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

const CustomSidebar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.sidebarText}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Reports')}>
        <Text style={styles.sidebarText}>Reports</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('FeedingTime')}>
        <Text style={styles.sidebarText}>Feeding Time</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.sidebarText}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Guideline')}>
        <Text style={styles.sidebarText}>Guide</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => {
        navigation.navigate('SignIn'); // Navigate to SignIn screen in HomeStack
      }}>
        <Text style={styles.sidebarText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const FeedingTimeScreen = () => (
  <View style={styles.screen}>
    <Text>Feeding Time Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

const GuideScreen = () => (
  <View style={styles.screen}>
    <Text>Guide Screen</Text>
  </View>
);

export default function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={() => <CustomSidebar />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="FeedingTime" component={FeedingTimeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Guide" component={GuideScreen} />
      <Drawer.Screen name="SignIn">
        {() => {
          const navigation = useNavigation();
          navigation.navigate('SignIn'); // Navigate to SignIn screen in HomeStack
          return null; // Return null to avoid rendering this component
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
