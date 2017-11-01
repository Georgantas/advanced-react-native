
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-bde6e.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: '', code: '', status: 'Not signed in' };

    handleSubmit = async () => {
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                phone: this.state.phone,
                code: this.state.code
            });

            firebase.auth().signInWithCustomToken(data.token);

            this.setState({ status: 'Signed in!' });
        } catch(err) {
            console.log(err);
        }
    }

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

                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput
                        value={this.state.code}
                        onChangeText={value => this.setState({ code: value })}
                    />
                </View>
                <Text>Current status: {this.state.status}</Text>
                <Button onPress={this.handleSubmit} title="Submit" />
            </View>
        );
    }
}

export default SignInForm;
