// @flow
import { combineReducers } from 'redux';
import user from './UserReducer';
import posts from './PostsReducer';
import sample from './SampleReducer';

export default combineReducers({
    user,
    posts,
    sample
});
