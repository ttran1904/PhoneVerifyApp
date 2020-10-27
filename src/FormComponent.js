import React, { Component } from 'react';
import TextInput from './TextInput';

class FormComponent extends Component {

    constructor() {
        super();

        this.state = {
            formControls: {
                phone: {
                    value: '',
                    placeholder: 'Enter your phone number'
                },
                code : {
                    value: ''
                }
            }
        }
    }

    changeHandler = event => {
        const phone = event.target.phone;
        const value = event.target.value;

        this.setState({
            formControls: {
                [phone]: value
            }
        });
    }

    render() {

        return (
            <TextInput name="phone"
                       placeholder={this.state.formControls.phone.placeholder}
                       value={this.state.formControls.phone.value}
                       onChange={this.changeHandler}
            />
        );

    }
}