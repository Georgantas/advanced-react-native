
import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';

// a little glitchy sometimes
class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />;
        }
    }

    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta:  0.04,
            latitudeDelta:  0.09
        }
    }
    
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    componentDidMount() {
        setTimeout(() => this.setState({ mapLoaded: true }), 300);
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    render() {
        if(!this.state.mapLoaded){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Search this area" 
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
}

export default connect(null, actions)(MapScreen);
