import React, { Component } from 'react';
import TextInput from './TextInput';

class FormComponent extends Component {
    constructor() {
        super();
        this.state = {
            formControls: {
                phoneNumber: {
                    value: '',
                    placeholder: 'Enter your phone number'
                },
                accessCode: {
                    value: ''
                }
            }
        }
    }

    changeHandler = event => {
        const phoneNumber = event.target.phoneNumber;
        const value = event.target.value;
        this.setState({
            formControls: {
                [phoneNumber]: value
            }
        });
    }

    render() {
        return (
            <TextInput name="phone"
                       placeholder={this.state.formControls.phoneNumber.placeholder}
                       value={this.state.formControls.phoneNumber.value}
                       onChange={this.changeHandler}
            />
        );

    }
}