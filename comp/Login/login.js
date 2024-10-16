import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style'; // Make sure the path is correct

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      u_name: '',
      u_pass: '',
      check_textInputChange: false,
      secureTextEntry: true,
      u_nameError: false, // State for tracking username field error
      u_passError: false, // State for tracking password field error
    };
  }

  InsertRecord = () => {
    const { u_name, u_pass } = this.state;

    // Validate input fields
    if (u_name.length === 0 || u_pass.length === 0) {
      this.setState({
        u_nameError: u_name.length === 0,
        u_passError: u_pass.length === 0,
      });
      alert("Required Field Is Missing!!!");
      return; // Early return to prevent further execution
    }

    const APIURL = 'https://sba-com.preview-domain.com/api/login.php';

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const Data = {
      u_name: this.state.u_name,
      u_pass: this.state.u_pass
    };

    console.log("Sending request to:", APIURL);
    console.log("Request data:", Data);

    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Parsed response:", responseJson);
        alert(responseJson.Message);
        if (responseJson.Message === "Logging in!!") {
          this.props.navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.error("ERROR FOUND:", error);
        alert("Error Occurred: " + error.message);
      });
  }

  updateSecureTextEntry() {
    this.setState(prevState => ({
      secureTextEntry: !prevState.secureTextEntry
    }));
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('../../assets/logo.jpg')} style={styles.logo} />

          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter your Username"
            placeholderTextColor="#000000"
            style={[styles.input, this.state.u_nameError && styles.errorInput]}
            onChangeText={u_name => this.setState({ u_name, u_nameError: false })}
          />
          {this.state.u_nameError && <Text style={styles.errorMessage}>Please enter your email or phone number</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={[styles.passwordContainer, this.state.u_passError && styles.errorInput]}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#000000"
              style={styles.passwordInput}
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={u_pass => this.setState({ u_pass, u_passError: false })}
            />
            <TouchableOpacity onPress={() => this.updateSecureTextEntry()} style={styles.icon}>
              {this.state.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="black" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {this.state.u_passError && <Text style={styles.errorMessage}>Please enter your password</Text>}

          <TouchableOpacity style={styles.button} onPress={this.InsertRecord}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Create new Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
