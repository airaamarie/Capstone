import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import CustomPopup from './CustomPopup';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const FishTankRegistration = ({ navigation }) => {
  const [tankId, setTankId] = useState(null);
  const [selectedServo, setSelectedServo] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const [sensor1, setSensor1] = useState(null);
  const [sensor2, setSensor2] = useState(null);
  const [sensor3, setSensor3] = useState(null);
  const [servos, setServos] = useState([]);
  const [pumps, setPumps] = useState([]);
  const [sensor1Uids, setSensor1Uids] = useState([]);
  const [sensor2Uids, setSensor2Uids] = useState([]);
  const [sensor3Uids, setSensor3Uids] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [openServo, setOpenServo] = useState(false);
  const [openPump, setOpenPump] = useState(false);
  const [openSensor1, setOpenSensor1] = useState(false);
  const [openSensor2, setOpenSensor2] = useState(false);
  const [openSensor3, setOpenSensor3] = useState(false);
  const [openTank, setOpenTank] = useState(false);

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const response = await fetch('https://sba-com.preview-domain.com/api/fetchTankNames.php');
        const data = await response.json();
        if (data.tanks) {
          setTanks(data.tanks);
        } else {
          console.error('No tanks found in response');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch tanks: ' + error);
      }
    };

    const fetchServos = async () => {
      try {
        const response = await fetch('https://sba-com.preview-domain.com/api/fetchServoUids.php');
        const data = await response.json();
        if (data.servoUids) {
          setServos(data.servoUids.map(uid => ({ label: uid, value: uid })));
        } else {
          console.error('No servo UIDs found in response');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch servos: ' + error);
      }
    };

    const fetchPumps = async () => {
      try {
        const response = await fetch('https://sba-com.preview-domain.com/api/fetchPumpUids.php');
        const data = await response.json();
        if (data.pumpUids) {
          setPumps(data.pumpUids.map(uid => ({ label: uid, value: uid })));
        } else {
          console.error('No pump UIDs found in response');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch pumps: ' + error);
      }
    };

    const fetchSensorUidsByType = async (sensorType) => {
      try {
        const response = await fetch(`https://sba-com.preview-domain.com/api/fetchSensors.php?sensor_type=${sensorType}`);
        const data = await response.json();
        return data.sensorUids || [];
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch sensors: ' + error);
        return [];
      }
    };

    const fetchSensors = async () => {
      const tempSensors = await fetchSensorUidsByType('Temperature');
      const pHSensors = await fetchSensorUidsByType('pH');
      const ammoniaSensors = await fetchSensorUidsByType('Ammonia');

      setSensor1Uids(tempSensors);
      setSensor2Uids(pHSensors);
      setSensor3Uids(ammoniaSensors);
    };

    fetchTanks();
    fetchServos();
    fetchPumps();
    fetchSensors();
  }, []);

  const registerTank = () => {
    if (!tankId || !selectedServo || !selectedPump || !sensor1 || !sensor2 || !sensor3) {
      setMessage('Please fill all fields');
      setIsPopupVisible(true);
      return;
    }

    const data = {
      tankId,
      selectedServo,
      selectedPump,
      sensor1,
      sensor2,
      sensor3,
    };

    fetch('https://sba-com.preview-domain.com/api/register_tanksensors.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setMessage(response.Message);
        setIsPopupVisible(true);
      })
      .catch((error) => {
        setMessage('Error: ' + error);
        setIsPopupVisible(true);
      });
  };

  const renderContent = () => (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        open={openTank}
        value={tankId}
        items={tanks}
        setOpen={setOpenTank}
        setValue={setTankId}
        setItems={setTanks}
        placeholder="Select Fish Tank"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={10} // Ensures the first dropdown appears on top when opened
      />
      <DropDownPicker
        open={openServo}
        value={selectedServo}
        items={servos}
        setOpen={setOpenServo}
        setValue={setSelectedServo}
        setItems={setServos}
        placeholder="Select Feeder"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={9} // Adjust zIndex for overlapping
      />
      <DropDownPicker
        open={openPump}
        value={selectedPump}
        items={pumps}
        setOpen={setOpenPump}
        setValue={setSelectedPump}
        setItems={setPumps}
        placeholder="Select Water Pump"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={8}
      />
      <DropDownPicker
        open={openSensor1}
        value={sensor1}
        items={sensor1Uids.map((uid) => ({ label: uid, value: uid }))}
        setOpen={setOpenSensor1}
        setValue={setSensor1}
        placeholder="Select Temperature Sensor"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={7}
      />
      <DropDownPicker
        open={openSensor2}
        value={sensor2}
        items={sensor2Uids.map((uid) => ({ label: uid, value: uid }))}
        setOpen={setOpenSensor2}
        setValue={setSensor2}
        placeholder="Select pH Sensor"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={6}
      />
      <DropDownPicker
        open={openSensor3}
        value={sensor3}
        items={sensor3Uids.map((uid) => ({ label: uid, value: uid }))}
        setOpen={setOpenSensor3}
        setValue={setSensor3}
        placeholder="Select Ammonia Sensor"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
        zIndex={5}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Register Fish Tank</Text>
      </View>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollView}
      />
      <TouchableOpacity style={styles.registerButton} onPress={registerTank}>
        <Text style={styles.registerButtonText}>Register Tank</Text>
      </TouchableOpacity>
      <CustomPopup
        isVisible={isPopupVisible}
        message={message}
        onClose={() => setIsPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E0E6',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
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
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  dropdownContainer: {
    paddingBottom: 20, // Add some padding at the bottom for spacing
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#b0bec5',
    borderWidth: 1,
    marginBottom: 30, // Adjust spacing between dropdowns
    borderRadius: 5,
    height: 40,
  },
  registerButton: {
    backgroundColor: '#0277bd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FishTankRegistration;
