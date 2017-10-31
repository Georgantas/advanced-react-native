
import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // should this panResponder take care of this action?
            //if you console log gesture, you might see 0s, because the properties get set to that when the user lets go
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            }, // when moving finger across screen
            onPanResponderRelease: (event, gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipe('right');
                } else if(gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            } // when letting go of finger
        });

        this.state = { panResponder, position, index: 0 };
        // this.state = { panResponder }; // misleading because it does not use the state system
    }

    forceSwipe(direction) {
        // no fancy bouncing with timing function
        Animated.timing(this.state.position, {
            toValue: { x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH , y: 0 },
            duration: SWIPE_OUT_DURATION // 250 ms
        }).start(() => this.onSwipeComplete(direction)); // called when the animation is complete
    }

    onSwipeComplete() {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index]

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5], //input scale
            outputRange: ['-120deg', '0deg', '120deg'] //output scale
        })

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        return this.props.data.map( (item, index) => {
            if(index === 0){
                return (
                <Animated.View
                    key={item.id}
                    style={this.getCardStyle()}
                    {...this.state.panResponder.panHandlers}
                >
                    {this.props.renderCard(item)}
                </Animated.View>)
            }

            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;
