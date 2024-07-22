import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      uname: '',
      upass: '',
      confirmPw: '',
      phoneNumber: '', 
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
      unameError: false,
      upassError: false,
      confirmPwError: false,
      phoneNumberError: false, 
    };
  }

  InsertRecord = () => {
    const { uname, upass, confirmPw, phoneNumber } = this.state;

    if (uname.length === 0 || upass.length === 0 || confirmPw.length === 0 || phoneNumber.length === 0) {
      alert("Required Field Is Missing!!!");
    } else if (upass !== confirmPw) {
      alert("Password does not match!!!");
    } else {
      var InsertAPIURL = "http://192.168.1.114/CAPSTONE/api/signup.php"; 

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      var Data = {
        userName: uname,
        userPass: upass,
        phoneNumber: phoneNumber
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then(response => response.json())
      .then(response => {
        alert(response.Message);
        this.props.navigation.navigate("SignIn");
      })
      .catch(error => {
        alert("Error Occurred: " + error);
      });
    }
  }

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  updateConfirmSecureTextEntry = () => {
    this.setState({
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry
    });
  }

  render() {
    const { uname, upass, confirmPw, phoneNumber, secureTextEntry, confirmSecureTextEntry, unameError, upassError, confirmPwError, phoneNumberError } = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, unameError && styles.errorInput]}
            placeholder="Enter your username (email or phone number)"
            value={uname}
            onChangeText={text => this.setState({ uname: text, unameError: false })}
          />
          {unameError && <Text style={styles.errorMessage}>Please enter your username</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={[styles.passwordContainer, upassError && styles.errorInput]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={upass}
              onChangeText={text => this.setState({ upass: text, upassError: false })}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={this.updateSecureTextEntry} style={styles.icon}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="black" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {upassError && <Text style={styles.errorMessage}>Please enter your password</Text>}

          <Text style={styles.label}>Confirm Password</Text>
          <View style={[styles.passwordContainer, confirmPwError && styles.errorInput]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm your password"
              value={confirmPw}
              onChangeText={text => this.setState({ confirmPw: text, confirmPwError: false })}
              secureTextEntry={confirmSecureTextEntry}
            />
            <TouchableOpacity onPress={this.updateConfirmSecureTextEntry} style={styles.icon}>
              {confirmSecureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="black" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {confirmPwError && <Text style={styles.errorMessage}>Please confirm your password</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, phoneNumberError && styles.errorInput]}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={text => this.setState({ phoneNumber: text, phoneNumberError: false })}
            keyboardType="phone-pad"
          />
          {phoneNumberError && <Text style={styles.errorMessage}>Please enter a valid phone number</Text>}

          <TouchableOpacity style={styles.button} onPress={this.InsertRecord}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
