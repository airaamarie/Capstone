import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Feeding = () => {
  const [servoTimings, setServoTimings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = () => {
    fetch('https://sba-com.preview-domain.com/api/fetchServoTimings.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        if (data.servoTimings) {
          setServoTimings(data.servoTimings);
        } else {
          Alert.alert('Notice', data.message || 'No servo timings found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching servo timings:', error);
        Alert.alert('Error', 'Failed to fetch servo timings.');
      });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setLoading(true);
            fetch('https://sba-com.preview-domain.com/api/deleteServoTiming.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ timing_id: id }),
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                setLoading(false);
                if (data.success) {
                  Alert.alert('Success', data.message);
                  // Use functional setState to update the list
                  setServoTimings(prevTimings => prevTimings.filter(item => item.id !== id));
                } else {
                  Alert.alert('Error', data.message);
                }
              })
              .catch(error => {
                setLoading(false);
                Alert.alert('Error', 'Failed to delete the entry.');
                console.error('Error deleting servo timing:', error);
              });
          }
        }
      ]
    );
  };

  const handleAddNew = () => {
    navigation.navigate('AddServoTiming');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, styles.uidText]}>{item.servo_uid}</Text>
      <Text style={[styles.itemText, styles.timeText]}>{item.time}</Text>
      <Text style={[styles.itemText, styles.statusText]}>{item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Edit', { item })}
          style={styles.iconButton}
        >
          <Icon name="pencil" size={20} color="#0277bd" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDelete(item.id)} 
          style={styles.iconButton}
        >
          <Icon name="trash" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Servo Timings</Text>
        <TouchableOpacity 
          onPress={handleAddNew} 
          style={styles.addButton}
        >
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.uidHeader]}>Servo UID</Text>
        <Text style={[styles.tableHeaderText, styles.timeHeader]}>Time</Text>
        <Text style={[styles.tableHeaderText, styles.statusHeader]}>Status</Text>
        <Text style={[styles.tableHeaderText, styles.actionsHeader]}>Actions</Text>
      </View>
      <FlatList
        data={servoTimings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B0E0E6',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#0277bd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0277bd',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#004d40',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    paddingVertical: 8,
  },
  uidHeader: {
    flex: 2,
  },
  timeHeader: {
    flex: 1.5,
  },
  statusHeader: {
    flex: 1.5,
  },
  actionsHeader: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#b0bec5',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#004d40',
  },
  uidText: {
    flex: 2,
  },
  timeText: {
    flex: 1.5,
  },
  statusText: {
    flex: 1.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 0,
    marginLeft: 10,
  },
});

export default Feeding;
