
import * as types from '../actions/types';

export default (state={ results: [] }, action) => {
    switch(action.type){
        case types.FETCH_JOBS:
            return action.data;
        default:
            return state;
    }
}
