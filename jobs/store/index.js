
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

/*
    Big Gotcha with Redux Persist:
    If you persist the state in a user's device and then modify the type of that state from {} to, say, [],
    this can crash the user's device. The older version of the state will be 'rehydrated' on the user's device,
    and this can cause unexpected behavior.

    To fix: Use redux-persist-migrate.
*/

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk), autoRehydrate())
);

// use .purge() to clear the AsyncStorage
persistStore(store, {
    storage: AsyncStorage, whitelist: ['likedJobs']
});

export default store;
