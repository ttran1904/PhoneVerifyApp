import './App.css';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import validator from 'validator';

let validatePhoneNumber;
validatePhoneNumber = (number) => {
  const isValidPhoneNumber = validator.isMobilePhone(number)
  return (isValidPhoneNumber)
}

class App extends Component {


  constructor() {
    super();

    this.state = {
      formIsValid: false,
      formControls: {

        phone: {
          value: '',
          placeholder: 'Enter your phone number',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        }
      }
    }
  }

  render() {
    return (
        <View style = {styles.container}>
          <Text style = {styles.title}> Verify Your Phone Number </Text>
          <Text style = {styles.text}> Phone number: </Text>
          <TextInput style = {styles.textInput}
                     underlineColorAndroid = "transparent"
                     placeholder = "Enter your phone number"
                     placeholderTextColor = "#9a73ef"/>
          <TextInput style = {styles.textInput}
                     underlineColorAndroid = "transparent"
                     placeholder = "Enter Code"
                     placeholderTextColor = "#9a73ef"/>
          <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                () => this.login(this.state.email, this.state.password)
              }>
            <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>
    )
  }
}




export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f8',
    borderWidth: 1
  },
  title: {
    color: 'red',
    fontSize: 20
  },
  submitButton: {
    backgroundColor: '#7a42f8',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
})
