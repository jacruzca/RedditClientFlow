// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { actionCreators } from '../actions/UserActions';
import type { State } from '../actions/UserActions';


type Props = {
    item: any,
    dispatch: PropTypes.func,
    isAuthenticating: boolean,
    token: string
};

class Login extends Component<void, Props, void> {
    componentDidMount() {
        this.props.dispatch(actionCreators.startAuthentication())
    }
    
    componentDidUpdate() {
        // the token must have been asynchronously loaded from available
        this.popOnToken();
    }
    
    popOnToken = () => {
        if (this.props.token) {
            Actions.pop()
        }
    };
    
    // We watch for changes in navigation, because we asked Reddit to redirect us
    // to an arbitrary URL callback://login when the login has been completed.
    onNavigationStateChange = (navState: any) => {
        if (this.props.isAuthenticating && navState.url.indexOf('about://callback/login#') === 0) {
            // Regex shortcut to grab the access_token if the URL matches this format.
            const regex = /^about:\/\/callback\/login#access_token=(.+)&token/;
            let accessToken = navState.url.match(regex)[1];
            this.props.dispatch(actionCreators.authenticationSuccess(accessToken));
        }
    };
    
    render() {
        const REDDIT_APP_ID = 'Mcnxsc2BLOXi8w';
        const LOGIN_URL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${REDDIT_APP_ID}&response_type=token&state=RANDOM_STRING&redirect_uri=about://callback/login&scope=read`;
        return (
            <WebView
                source={{ uri: LOGIN_URL }}
                onNavigationStateChange={this.onNavigationStateChange}
            />
        );
    }
}

const mapStateToProps = (state: State) => ({
    item: state.sample.sampleItem,
    isAuthenticating: state.user.isAuthenticating,
    token: state.user.token
});

export default connect(mapStateToProps)(Login)