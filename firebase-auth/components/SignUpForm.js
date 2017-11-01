
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-bde6e.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '' };
    // The line above is equivalent to:
    // constructor(props){
    //     super(props);

    //     this.state = { phone: '' };
    // }

    handleSubmit = async () => {
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
        } catch(err) {
            console.log(err);
        }
    } // to avoid having to use .bind(this)
    
    // the above code is equivalent to the below
    
    // handleSubmit = () => {
    //     axios.post(`${ROOT_URL}/createUser`, {
    //         phone: this.state.phone
    //     })
    //     .then(() => {
    //         axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    //     })
    //     .catch(...)
    // } // to avoid having to use .bind(this)

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={value => this.setState({ phone: value })}
                    />
                </View>
                <Button onPress={this.handleSubmit} title="Submit" />
            </View>
        );
    }
}

export default SignUpForm;
