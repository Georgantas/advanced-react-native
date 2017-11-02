
import React, { Component } from 'react';
import { Text, View, Platform, ScrollView, Linking } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => { // cannot use this.props.navigation because this is a class level function
        return {
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
            },
            headerRight: (
                <Button
                    title="Settings"
                    onPress={() => { navigation.navigate('settings') } }
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0, 122, 255, 1)"
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        }
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const initialRegion = {
                longitude: job.longitude,
                latitude: job.latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }

            return (
                <Card title={job.jobtitle} key={job.jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled={!Platform.OS === 'android'}
                            scrollEnabled={false}
                            region={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={{ fontStyle: 'italic' }}>{job.company}</Text>
                            <Text style={{ fontStyle: 'italic' }}>{job.formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(job.url)}
                        />
                    </View>
                </Card>
            );
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps, actions)(ReviewScreen);
