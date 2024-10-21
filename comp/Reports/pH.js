// PH.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import styles from './style'; // Import the styles

const PH = () => {
  const navigation = useNavigation();
  const [tanks, setTanks] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { width } = Dimensions.get('window');

  // Fetch tank names
  useEffect(() => {
    fetch('https://sba-com.preview-domain.com/api/fetchTankNames.php')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tanks:', data.tanks);
        if (Array.isArray(data.tanks)) {
          setTanks(data.tanks);
        } else {
          console.error('Expected tanks to be an array but got:', data.tanks);
        }
      })
      .catch(error => console.error('Error fetching tank data:', error));

    setHistoryData(generateRandomHistoryData());
  }, []);

  const generateRandomHistoryData = () => {
    return Array.from({ length: 30 }, (_, index) => ({
      date: moment().subtract(index, 'days').format('YYYY-MM-DD'),
      pH: (Math.random() * (8.5 - 6.5) + 6.5).toFixed(2),
    }));
  };

  const data = {
    labels: Array.from({ length: 5 }, (_, index) => moment().subtract(index, 'months').format('MMM')),
    datasets: [
      {
        data: Array.from({ length: 5 }, () => (Math.random() * (8.5 - 6.5) + 6.5).toFixed(2)),
      },
    ],
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyRow}>
      <Text style={styles.historyCell}>{item.date}</Text>
      <Text style={styles.historyCell}>{item.pH} pH</Text>
    </View>
  );

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {item.type === 'report' ? (
        <>
          <Text style={styles.text}>pH Reports</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={data}
              width={width * 0.8}
              height={220}
              yAxisLabel=""
              yAxisSuffix="pH"
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
                yAxisInterval: 1,
                yAxisLabelStyle: {
                  marginRight: 10,
                },
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.historyHeaderContainer}>
            <Text style={styles.historyTitle}>pH History</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.filterButtonText}>Select Date</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                  // Add logic to filter history data based on selected date if needed
                }
              }}
            />
          )}
          <View style={styles.historyTable}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyHeaderCell}>Date</Text>
              <Text style={styles.historyHeaderCell}>pH</Text>
            </View>
            <FlatList
              data={historyData.filter(item => item.date === moment(date).format('YYYY-MM-DD')).slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.date}
              contentContainerStyle={styles.historyList}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                disabled={currentPage === 0}
              >
                <Text style={styles.paginationText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={(currentPage + 1) * itemsPerPage >= historyData.length}
              >
                <Text style={styles.paginationText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={showFilterOptions}>
          <Image 
            source={require('../../assets/filter.png')} 
            style={styles.filterIcon} 
          />
          <Text style={styles.filterButtonText}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const showFilterOptions = () => {
    if (tanks.length === 0) {
      Alert.alert('No tanks available', 'Please try again later.');
      return;
    }

    const tankNames = tanks.map(tank => tank.label);
    
    if (tankNames.length === 0) {
      Alert.alert('No tanks available', 'Please try again later.');
      return;
    }

    Alert.alert(
      'Select a Tank',
      'Choose a tank to view its pH history.',
      tankNames.map((tank, index) => ({
        text: tank,
        onPress: () => handleTankSelection(index),
      })),
      { cancelable: true }
    );
  };

  const handleTankSelection = (index) => {
    const selectedTank = tanks[index];
    setSelectedTank(selectedTank);
    // Perform any additional actions when a tank is selected
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={[{ type: 'report' }, { type: 'history' }]}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PH;
