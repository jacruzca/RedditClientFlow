// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { persistStore, autoRehydrate } from 'redux-persist';
//import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import Reactotron from 'reactotron-react-native';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
}

//let store;
//if (process.env.NODE_ENV === 'development') {
//    store = Reactotron.createStore(
//        reducers,
//        {},
//        compose(
//            applyMiddleware(...middleware),
////        autoRehydrate()
//        )
//    );
//} else {

export default function configureStore() {
    const store = createStore(
        reducers,
        {},
        compose(
            applyMiddleware(...middleware),
//        autoRehydrate()
        )
    );
//}
//persistStore(store, { storage: AsyncStorage});
    return store;
};
