import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const AddServoTiming = () => {
    const [date] = useState(getCurrentDate());
    const [timeString, setTimeString] = useState(''); // For displaying time
    const [status, setStatus] = useState('Active');
    const [servoUid, setServoUid] = useState('');
    const [servoUids, setServoUids] = useState([]);
    const [open, setOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [error, setError] = useState(''); // For storing error messages
    const navigation = useNavigation();

    // Fetch Servo UIDs from the API
    useEffect(() => {
        fetch('http://192.168.68.108/CAPSTONE/api/fetchServoUids.php')
            .then(response => response.json())
            .then(data => {
                if (data.servoUids) {
                    setServoUids(data.servoUids.map(uid => ({ label: uid, value: uid })));
                } else {
                    setError('No servo UIDs found in response');
                }
            })
            .catch(error => {
                setError('Error fetching servo UIDs');
            });
    }, []);

    // Handle the save action
    const handleSave = () => {
        setError(''); // Reset error message

        // Ensure a Servo UID is selected
        if (!servoUid) {
            setError('Please select a Servo UID.');
            return;
        }

        // Validate time format
        const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // HH:MM format
        if (!timePattern.test(timeString)) {
            setError('Please enter a valid time in HH:MM format (24-hour).');
            return;
        }

        // Prepare the entry without seconds
        const newEntry = { servoUid, time: timeString, date, status };

        // Send data to the API
        fetch('http://192.168.68.108/CAPSTONE/api/addServoTiming.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry),
        })
            .then(response => response.json())
            .then(data => {
                if (data.Message) {
                    navigation.navigate('Feeding', { newEntry });
                } else {
                    setError('Error saving the entry');
                }
            })
            .catch(error => {
                setError('Error saving the entry');
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Servo Timing</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={date}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    value={timeString} // Display the entered time
                    onChangeText={setTimeString} // Update timeString as user types
                    placeholder="Enter time (HH:MM)"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Text style={styles.label}>Servo UID</Text>
                <DropDownPicker
                    open={open}
                    value={servoUid}
                    items={servoUids}
                    setOpen={setOpen}
                    setValue={setServoUid}
                    setItems={setServoUids}
                    placeholder="Select a Servo UID"
                    style={styles.dropdown}
                    dropDownStyle={styles.dropdown}
                />
                <Text style={styles.label}>Status</Text>
                <DropDownPicker
                    open={statusOpen}
                    value={status}
                    items={[
                        { label: 'Active', value: 'Active' },
                        { label: 'Inactive', value: 'Inactive' }
                    ]}
                    setOpen={setStatusOpen}
                    setValue={setStatus}
                    placeholder="Select Status"
                    style={styles.dropdown}
                    dropDownStyle={styles.dropdown}
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    formContainer: {
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: '#b0bec5',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        color: '#004d40',
        marginVertical: 10,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#b0bec5',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        height: 40,
    },
    saveButton: {
        backgroundColor: '#0277bd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20, // Added margin bottom
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },
});

export default AddServoTiming;
