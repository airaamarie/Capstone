    import React, { useState } from 'react';
    import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
    import CustomPopup from './CustomPopup'; // Ensure you have this component for the popup
    import Icon from 'react-native-vector-icons/FontAwesome';

    const { width } = Dimensions.get('window');

    const TankRegistration = ({ navigation }) => {
    const [tankName, setTankName] = useState('');
    const [message, setMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const registerTank = () => {
        if (tankName.length === 0) {
        setMessage('Please enter a tank name');
        setIsPopupVisible(true);
        return;
        }

        const data = { tank_name: tankName }; // Ensure the key matches your PHP API

        fetch('http://192.168.101.76/CAPSTONE/api/register-tank.php', { // Adjust the URL as needed
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(response => {
            setMessage(response.Message);
            setIsPopupVisible(true);
        })
        .catch(error => {
            setMessage('Error: ' + error);
            setIsPopupVisible(true);
        });
    };

    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Register Tank</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <TextInput
            style={styles.input}
            value={tankName}
            onChangeText={setTankName}
            placeholder="Tank Name"
            />
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={registerTank}>
            <Text style={styles.saveButtonText}>Register Tank</Text>
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
    input: {
        height: 40,
        borderColor: '#b0bec5',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#0277bd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    });

    export default TankRegistration;
