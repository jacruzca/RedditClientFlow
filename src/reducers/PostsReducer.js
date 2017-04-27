// @flow
import type { State, Action } from '../actions/PostsActions';
import {
    FETCH_POSTS_PENDING,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../actions/types';

// Initial state
const initialState: State = {
    isFetching: false,
    token: null,
    timestamp: null,
    subreddits: {
        hot: [],
        random: [],
    }
};

export default (state: State = initialState, action: Action) => {
    
    switch (action.type) {
        case FETCH_POSTS_PENDING: {
            return {
                ...state,
                isFetching: true,
                timestamp: action.timestamp,
                error: null
            }
        }
        case FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                subreddits: {
                    ...state.subreddits,
                    [action.subreddit]: action.items || [],
                },
                error: null
            }
        }
        case FETCH_POSTS_FAILURE: {
            return {
                ...state,
                isFetching: false,
                subreddits: {
                    ...state.subreddits,
                    [action.subreddit]: [],
                },
                error: action.error
            }
        }
        default: {
            return state
        }
    }
};
