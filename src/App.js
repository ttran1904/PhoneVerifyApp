import './App.css';
import validate from "./controllers/verifyController";
import Database from "./controllers/database";
import axios from 'axios';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Paper, Button, IconButton, TextField} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import verifyController from './controllers/verifyController';
import validator from "validator";


class App extends Component {
  /** Main App Constructor.*/
  constructor() {
    super();

    this.state = {
      showCode: false,
      formIsValid: false,
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

  _getCode = async() => {
    const pno = this.state.phoneNumber;
    await axios.get("http://localhost:3000/process/getcode", {
      params: {
        phoneNumber: pno,
        channel: 'sms'
      }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
  };

  _verifyCode = async () => {
    const e = this.state.phoneNumber.value;
    await axios.get("http://localhost:3000/process/validatecode", {
      params: {
        phoneNumber: e,
        code: this.state.accessCode
      }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }

  /** Change handler when update each input.*/
  changeHandler = event => {
    const phoneNumber = event.target.phoneNumber;
    const value = event.target.value;
  }

  /** Form submit handler. Send to Firebase to check, too.*/
  formSubmitHandler = (event) => {
    event.preventDefault();
    let pno = this.state.refs.phoneNumber.value;
    let code = this.state.refs.accessCode.value;
    if (!this.state.showCode) {
      Database.handle(pno, null, this.state.showCode);
    } else {
      Database.handle(pno.code, this.state.showCode)
    }
    console.dir(this.state.formControls);
  }



  /** HTML Render.*/
  render() {
    return (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(160, 160, 160, 0.2)',
          height: '100vh'
        }}>
          <Paper elevation={4} style={{ padding: 20, width: 600, marginBottom: 60}}>
            <View style = {styles.container}>
              <Text style = {styles.title}> Verify Your Phone Number </Text>
              {!this.state.showCode ? <h3 style={{marginLeft: 10, color: '#9f9f9f'}}> by Emi Tran</h3> : <IconButton onClick={() => {
                this.setState({showCode: false, otp: ''}); //TODO: Set OTP on database to ''
              }} size="small"><ArrowBackIcon /></IconButton>}
              {this.state.showCode ? <h3>Enter Access Code</h3> : <h3>Enter your Phone Number</h3> }
              {this.state.showCode ? <p>An Access Code has been sent to your phone Number (Twilio).</p> : null}

              {!this.state.showCode?
                  <TextField type = "text"
                             name = "phoneNumber"
                             ref="phoneNumber"
                             value={this.state.phoneNumber.value}
                             onChange={e => {
                               if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                               this.setState({phoneNumber: e.target.value});
                             }}}
                             style = {styles.textInput}
                             color="secondary"
                             underlineColorAndroid = "transparent"
                             placeholder = "Enter your Phone Number"
                             placeholderTextColor = "#9a73ef"/>
                  :
                  <TextField type = "text"
                             name = "accessCode"
                             ref="accessCode"
                             color="secondary"
                             value={this.state.accessCode.value}
                             onChange={e => {this.setState({code: e.target.value})}}
                             style = {styles.textInput}
                             underlineColorAndroid = "transparent"
                             placeholder = "Enter Access Code"
                             placeholderTextColor = "#9a73ef"/>}
              {this.state.showCode ? <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
                Didn't receive an Access Code?
                <Button onClick={() => this._getCode()} color="primary" style={{textTransform: 'none', fontSize: 15}}>
                  Resend OTP
                </Button>
              </div> : null }

              <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                <Button
                    variant="contained"
                    disabled= {(this.state.phoneNumber.length==0) ||
                      (this.state.accessCode==null) ||
                      !isNumeric(this.state.phoneNumber) ||
                      (this.state.showCode && this.state.accessCode.length!==6)}
                    color="secondary"
                    style={{
                      color: 'white',
                      marginLeft: 'auto',
                      textTransform: 'none'
                    }}
                    onClick={() => {
                      if(this.state.showCode) {
                        this._verifyCode();
                      } else {
                        this._getCode();
                        this.setState({showCode: true});
                      }
                    }}>
                  Verify
                </Button>
              </div>

            </View>
          </Paper>
        </div>

    )
  }
}


export default App;

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

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
    color: 'black',
    fontSize: 35
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
