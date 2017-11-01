
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to the Job App!', color: '#03A9F4' },
    { text: 'Use this App to get a job.', color: '#009688' },
    { text: 'Set your location, then swipe away.', color: '#03A9F4' }
];

class WelcomeScreeen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides data={ SLIDE_DATA } onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreeen;
