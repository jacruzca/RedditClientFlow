// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore  from './store/index';
import Router from './containers/Router';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}