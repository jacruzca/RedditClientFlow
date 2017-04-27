// @flow
import { setToken, getToken, clearToken, tokenHasExpired } from '../Api/Storage';
import RedditClient from '../Api/RedditClient'
import {
    FETCH_POSTS_PENDING,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from './types';

export type User = {
    token: string
};

export type Image = {
    source: {
        url: string
    }
};

export type Preview = {
    images: Array<Image>
};

export type Subreddit = string;

export type SubredditsList = {
    hot: Array<Subreddit>,
    random: Array<Subreddit>
};

export type State = {
    isFetching: boolean,
    token: ?string,
    timestamp: ?number,
    user?: User,
    subreddits: SubredditsList
};

type FetchPostsSuccessAction = {
    +type: typeof FETCH_POSTS_SUCCESS,
    items: Array<Subreddit>,
    +subreddit: Subreddit
}

type FetchPostsFailureAction = {
    +type: typeof FETCH_POSTS_FAILURE,
    +error: string;
}

type FetchPostsPendingAction = {
    +type: typeof FETCH_POSTS_PENDING,
    timestamp: number
}

export type Action =
    | FetchPostsSuccessAction
    | FetchPostsFailureAction
    | FetchPostsPendingAction;


type Dispatch = (action: Action) => any;
export type GetState = () => State;

const fetchPosts = (subreddit: Subreddit) => (dispatch: Dispatch, getState: GetState) => {
    dispatch({
        type: FETCH_POSTS_PENDING,
        timestamp: Date.now()
    });
    let user = getState().user;
    if (user) {
        new RedditClient(user.token).getPosts(subreddit)
            .then((result) => {
                if (result.error) {
                    dispatch(actionCreators.fetchPostsFailure(
                        `${result.error}: ${result.message}`
                    ))
                } else {
                    let items = null;
                    if (Array.isArray(result)) {
                        items = result.reduce((all, subitems) => all.concat(subitems.data.children), [])
                    } else {
                        items = result.data.children
                    }
                    dispatch(actionCreators.fetchPostsSuccess(items, subreddit))
                }
            })
            .catch((error) => {
                dispatch(actionCreators.fetchPostsFailure(error, subreddit))
            })
    }
};

const fetchPostsSuccess = (items: Array<Subreddit>, subreddit: Subreddit): FetchPostsSuccessAction => {
    return { type: FETCH_POSTS_SUCCESS, subreddit, items }
};

const fetchPostsFailure = (error: string): FetchPostsFailureAction => {
    return { type: FETCH_POSTS_FAILURE, error }
};

export const actionCreators = {
    fetchPosts,
    fetchPostsSuccess,
    fetchPostsFailure,
};