
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
    state = {  }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }} />
            </View>
        );
    }
}

export default MapScreen;
