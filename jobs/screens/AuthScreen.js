
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props); // not required
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps); // for after user signs in
    }

    onAuthComplete(props){
        if(props.token){
            this.props.navigation.navigate('map');
        }
    }

    state = {  }
    render() {
        return (
            <View />
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        token: auth.token
    }
}

export default connect(mapStateToProps, actions)(AuthScreen);
