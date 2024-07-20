// Parameters.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');

// Sample data for the line chart and history
const chartData = {
  labels: ['2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18', '2024-07-19'],
  datasets: [
    {
      data: [22, 24, 21, 23, 25], // Example temperature values
    },
  ],
};

const historyData = [
  { date: '2024-07-15', temperature: 22 },
  { date: '2024-07-16', temperature: 24 },
  { date: '2024-07-17', temperature: 21 },
  { date: '2024-07-18', temperature: 23 },
  { date: '2024-07-19', temperature: 25 },
];

const renderHistoryItem = ({ item }) => (
  <View style={styles.historyItem}>
    <Text style={styles.historyDate}>{item.date}</Text>
    <Text style={styles.historyTemperature}>{item.temperature}°C</Text>
  </View>
);

const Temperature = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Water Temperature Reports</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth * 0.9} // 90% of screen width
          height={220}
          yAxisLabel=""
          yAxisSuffix="°C"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#f0f0f0',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Temperature History</Text>
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.date}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
  },
  historyContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyDate: {
    fontSize: 16,
  },
  historyTemperature: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Temperature;
