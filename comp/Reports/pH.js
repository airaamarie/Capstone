import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PH = () => {
  const navigation = useNavigation();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [7.0, 7.2, 6.8, 7.1, 7.3, 7.4, 7.5],
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

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.text}>Parameters Content</Text>
        <LineChart
          data={data}
          width={width * 0.8} 
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
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
      <View style={styles.card}>
        <Text style={styles.historyTitle}>History</Text>
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.date}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'flex-start', 
  },
  card: {
    width: '100%',
    maxWidth: 600,
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
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
    color: '#000',
  },
  historyValue: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    backgroundColor: '#007bff', 
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PH;
