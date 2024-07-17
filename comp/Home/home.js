import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from '../../components/homeStack'; // Import your HomeStack navigator
import styles from './style'; // Import your updated styles

const Drawer = createDrawerNavigator();

// Import your custom icons from assets
import ThermometerIcon from '../../assets/thermometer.png';
import AnalyticsIcon from '../../assets/ph.png';

const HomeScreen = () => {
  const navigation = useNavigation();

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
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={() => <CustomSidebar />}>
      <Drawer.Screen name="Dashboard">
        {() => <DashboardScreen pieChartData={pieChartData} barChartData={barChartData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Temperature" component={TempScreen} />
      <Drawer.Screen name="pH Sensors" component={PHSensorsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Logout">
        {() => {
          navigation.navigate('SignIn'); // Navigate to SignIn screen in HomeStack
          return null; // Return null to avoid rendering this component
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const DashboardScreen = ({ pieChartData, barChartData }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
          {/* Optional menu button if needed */}
          {/* <Image source={require('../../assets/menu.png')} style={{ width: 32, height: 32 }} /> */}
        </TouchableOpacity>

        {/* Additional sensor cards */}
        <SensorCard
          sensorName="Temperature"
          sensorData="28"
          icon={<Image source={ThermometerIcon} style={styles.sensorIcon} />} // Updated icon using Image component and style
        />
        <SensorCard
          sensorName="pH"
          sensorData="7.2"
          icon={<Image source={AnalyticsIcon} style={styles.sensorIcon} />} // Updated icon using Image component and style
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

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Dashboard')}>
        <Text style={styles.sidebarText}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Temperature')}>
        <Text style={styles.sidebarText}>Temperature</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('pH Sensors')}>
        <Text style={styles.sidebarText}>pH Sensors</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Profile')}>
        <Text style={styles.sidebarText}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.sidebarSeparator} />
      <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Logout')}>
        <Text style={styles.sidebarText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const PHSensorsScreen = () => (
  <View style={styles.screen}>
    <Text>pH Sensors Screen</Text>
  </View>
);

const TempScreen = () => (
  <View style={styles.screen}>
    <Text>Temperature Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

export default HomeScreen;
