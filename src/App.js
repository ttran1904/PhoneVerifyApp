import './App.css';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import IconButton from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Firebase from '../controllers/firebase';
import validate from "../controllers/verifyController";
const verifyController = require('../controllers/verifyController');


class App extends Component {
  /** Main App Constructor.*/
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

  // // TODO: Determine functionality or if is necessary
  // _getCode = async() => {
  //   const e = this.state.code+this.state.pno;
  //   await axios.get("http://localhost:3000/process/getaccesscode", {
  //     params: {
  //       phoneNumber: e,
  //       channel: 'sms'
  //     }
  //   })
  //       .then(data => console.log(data))
  //       .catch(err => console.log(err));
  // };
  //
  // _verifyCode = async () => {
  //   const e = this.state.code+this.state.pno;
  //   await axios.get("http://localhost:3000/process/validateaccesscode", {
  //     params: {
  //       phoneNumber: e,
  //       code: this.state.otp
  //     }
  //   })
  //       .then(data => console.log(data))
  //       .catch(err => console.log(err));
  // }

  /** Change handler when update each input.*/
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

  /** Form submit handler. Send to Firebase to check, too.*/
  formSubmitHandler = (event) => {
    event.preventDefault();
    let pno = this.state.refs.phoneNumber.value;
    let code = this.state.refs.accessCode.value;
    if (!this.state.showCode) {
      Firebase.handle(pno, null, this.state.showCode);
    } else {
      Firebase.handle(pno.code, this.state.showCode)
    }
    console.dir(this.state.formControls);
  }



  /** HTML Render.*/
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
                         ref="phoneNumber"
                         className="form-control"
                         value={this.state.formControls.phoneNumber.value}
                         onChange={this.changeHandler}
                         style = {styles.textInput}
                         underlineColorAndroid = "transparent"
                         placeholder = "Enter your Phone Number"
                         placeholderTextColor = "#9a73ef"/>
                         :
              <TextInput type = "text"
                         name = "accessCode"
                         ref="accessCode"
                         className="form-control"
                         value={this.state.formControls.accessCode.value}
                         onChange={this.changeHandler}
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
