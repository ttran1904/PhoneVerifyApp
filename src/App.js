import './App.css';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import IconButton from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
const verifyController = require('../controllers/verifyController');


class App extends Component {

  constructor() {
    super();

    this.state = {
      showCode: false,

      formIsValid: false,
      formControls: {
        phoneNumber: {
          value: '',
          placeholder: 'Enter your phone number',
          valid: false,
          validationRules: {
            isValidPhone: true,
            isRequired: true
          }
        },
        accessCode: {
          value: '',
          placeholder: 'Enter access code sent to your phone',
          valid: false,
        }
      }
    }
  }

  _getCode = async() => {
    const e = this.state.code+this.state.pno;
    await axios.get("http://localhost:3000/process/getaccesscode", {
      params: {
        phonenumber: e,
        channel: 'sms'
      }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
  };

  _verifyCode = async () => {
    const e = this.state.code+this.state.pno;
    await axios.get("http://localhost:3000/process/validateaccesscode", {
      params: {
        phonenumber: e,
        code: this.state.otp
      }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }

  changeHandler = event => {
    const phoneNumber = event.target.phoneNumber;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    this.setState({
      formControls: updatedControls
    });
  }

  formSubmitHandler = () => {
    console.dir(this.state.formControls);
  }

  render() {
    return (
        <View style = {styles.container}>
          <Text style = {styles.title}> Verify Your Phone Number </Text>
          <Text style = {styles.text}> Phone number: </Text>
          {!this.state.showCode ? <h3 style={{marginLeft: 10, color: '#9f9f9f'}}>αlpha</h3> : <IconButton onClick={() => {
            this.setState({showCode: false, otp: ''}); //TODO: Set OTP on database to ''
          }} size="small"><ArrowBackIcon /></IconButton>}
          {this.state.showCode ? <h3>Enter Access Code</h3> : <h3>Enter your Phone Number</h3> }
          {this.state.showCode ? <p>An Access Code has been sent to your phone Number (Twilio).</p> : null}

          {!this.state.showCode?
              <TextInput type = "text"
                         name = "phoneNumber"
                         value={this.state.formControls.phoneNumber.value}
                         onChange={this.changeHandler}
                         style = {styles.textInput}
                         underlineColorAndroid = "transparent"
                         placeholder = "Enter your Phone Number"
                         placeholderTextColor = "#9a73ef"/>
                         :
              <TextInput type = "text"
                         name = "accessCode"
                         value={this.state.formControls.accessCode.value}
                         onChange={this.state.formControls.accessCode.value}
                         style = {styles.textInput}
                         underlineColorAndroid = "transparent"
                         placeholder = "Enter Access Code"
                         placeholderTextColor = "#9a73ef"/>}

          <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                //TODO: check parameters && Output result
                !(this.state.showCode)? () => verifyController.CreateNewAccessCode :
                    () => verifyController.ValidateAccessCode
              }
              onClick = {this.formSubmitHandler}>
            {!this.state.showCode ?
                <Text style = {styles.submitButtonText}> Submit </Text>
                : <Text style = {styles.submitButtonText}> Verify </Text>}
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
