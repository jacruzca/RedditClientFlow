// @flow
import { setToken, getToken, clearToken, tokenHasExpired } from '../Api/Storage';
import {
    AUTHENTICATION_PENDING,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE
} from './types';

type AuthenticationSuccessAction = {
    +type: typeof AUTHENTICATION_SUCCESS;
    +token: string;
}

type AuthenticationFailureAction = {
    +type: typeof AUTHENTICATION_FAILURE;
    +error: string;
}

type AuthenticationPendingAction = {
    +type: typeof AUTHENTICATION_PENDING
}

export type Action =
    | AuthenticationSuccessAction
    | AuthenticationPendingAction;

export type State = {
    sample: {
        sampleItem: any
    },
    user: {
        isAuthenticating: boolean,
        token: string
    }
};


type Dispatch = (action: Action) => any;

/**
 * This works because of our redux-thunk middleware in ./store/index
 *
 * ...action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action,
 * or to dispatch only if a certain condition is met.
 * The inner function receives dispatch and getState as parameters.
 */
const startAuthentication = () => async (dispatch: Dispatch) => {
    // Try and retrieve token from Storage
    const tokenExpired = await tokenHasExpired();
    const token = await getToken();
    if (tokenExpired) {
        clearToken();
    }
    if (token && !tokenExpired) {
        // succesfully retrieved it
        dispatch(authenticationSuccess(token));
        return;
    }
    dispatch({
        // failed to retrieve it
        type: AUTHENTICATION_PENDING
    });
};

const authenticationSuccess = (token: string): AuthenticationSuccessAction => {
    setToken(token);
    return { type: AUTHENTICATION_SUCCESS, token: token }
};

const authenticationFailure = (error: string): AuthenticationFailureAction => {
    return { type: AUTHENTICATION_FAILURE, error: error }
};

export const actionCreators = {
    startAuthentication,
    authenticationSuccess,
    authenticationFailure,
};