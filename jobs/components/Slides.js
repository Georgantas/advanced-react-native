
import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, idx) => (
            <View
                key={slide.text}
                style={[styles.slideView, { backgroundColor: slide.color }]}
            >
                <Text style={styles.slideText}>{slide.text}</Text>
                {idx === this.props.data.length - 1
                    ? <Button
                        buttonStyle={styles.buttonStyle}
                        title="Ready!"
                        raised
                        onPress={this.props.onComplete}
                    />
                    : null}
            </View>
        ))
    }
    
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
};

export default Slides;
