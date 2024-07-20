import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Get screen dimensions
const { width } = Dimensions.get('window');

const PH = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Replace with your dates
    datasets: [
      {
        data: [7.0, 7.2, 6.8, 7.1, 7.3, 7.4, 7.5], // Replace with your pH values
      },
    ],
  };

  const historyData = [
    { date: '2024-01-01', pH: 7.0 },
    { date: '2024-02-01', pH: 7.2 },
    { date: '2024-03-01', pH: 6.8 },
    { date: '2024-04-01', pH: 7.1 },
    { date: '2024-05-01', pH: 7.3 },
    { date: '2024-06-01', pH: 7.4 },
    { date: '2024-07-01', pH: 7.5 },
  ];

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>{item.date}</Text>
      <Text style={styles.historyValue}>{item.pH.toFixed(2)}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Parameters Content</Text>
        <View style={styles.box}>
          <LineChart
            data={data}
            width={width * 0.9} // 90% of screen width
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black
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
          <Text style={styles.historyTitle}>History</Text>
          <FlatList
            data={historyData}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.date}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow ScrollView to expand based on content
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000', // Black text
  },
  box: {
    width: '100%',
    maxWidth: 600, // Limit maximum width
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  historyContainer: {
    width: '100%',
    maxWidth: 600, // Limit maximum width
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyDate: {
    fontSize: 16,
    color: '#000', // Black text
  },
  historyValue: {
    fontSize: 16,
    color: '#000', // Black text
  },
});

export default PH;
