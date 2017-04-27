// @flow
import type { Action } from '../actions/UserActions';
import {
    AUTHENTICATION_PENDING,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE
} from '../actions/types';

export type State = {
    isAuthenticating: boolean,
    token: ?string
};

// Initial state
const initialState: State = {
    isAuthenticating: false,
    token: null
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case AUTHENTICATION_PENDING: {
            return {
                isAuthenticating: true,
                token: null,
                error: null
            }
        }
        case AUTHENTICATION_SUCCESS: {
            return {
                isAuthenticating: false,
                token: action.token,
                error: null
            }
        }
        case AUTHENTICATION_FAILURE: {
            return {
                isAuthenticating: false,
                token: null,
                error: action.error
            }
        }
        default: {
            return state
        }
    }
};
