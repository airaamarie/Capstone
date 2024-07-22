import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialFeedingData = [
  { id: '1', date: '2024-05-14', time: '03:45 PM', status: 'Active' },
  { id: '2', date: '2024-05-15', time: '10:30 PM', status: 'Active' },
  { id: '3', date: '2024-05-16', time: '09:15 AM', status: 'Inactive' },
];

const Feeding = () => {
  const [feedingData, setFeedingData] = useState(initialFeedingData);
  const navigation = useNavigation();

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
          onPress: () => setFeedingData(feedingData.filter(item => item.id !== id))
        }
      ]
    );
  };

  const handleAddNew = () => {
    navigation.navigate('AddFeeding');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, styles.dateText]}>{item.date}</Text>
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
        <Text style={styles.headerText}>Feeding Time</Text>
        <TouchableOpacity 
          onPress={handleAddNew} 
          style={styles.addButton}
        >
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.dateHeader]}>Date Created</Text>
        <Text style={[styles.tableHeaderText, styles.timeHeader]}>Time</Text>
        <Text style={[styles.tableHeaderText, styles.statusHeader]}>Status</Text>
        <Text style={[styles.tableHeaderText, styles.actionsHeader]}>Actions</Text>
      </View>
      <FlatList
        data={feedingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  dateHeader: {
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
  dateText: {
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
