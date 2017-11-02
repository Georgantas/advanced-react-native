
import * as types from './types';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');

    if(token){
        dispatch({
            type: types.FACEBOOK_LOGIN_SUCCESS,
            token
        });
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('146939872704590', {
        permissions: ['public_profile']
    });

    if(type === 'cancel') {
        return dispatch({type: types.FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', token);

    dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, token });
}
