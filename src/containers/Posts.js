// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actionCreators } from '../actions/PostsActions';
import type { Subreddit } from '../actions/PostsActions';

import Post from '../components/Post';

type Props = {
    item: any,
    dispatch: PropTypes.func,
    token: string,
    subreddit: Subreddit,
    isFetchingPosts: boolean,
    postsTimestamp: number,
    posts: Array<any>,
    postsError: string
};

class Posts extends Component<void, Props, void> {
    componentDidMount() {
        const { token, dispatch, subreddit } = this.props;
        if (!token) {
            return Actions.login()
        }
        
        // refetch on mount — like a refresh
        dispatch(actionCreators.fetchPosts(subreddit))
    }
    
    componentWillReceiveProps(nextProps: Props) {
        // If we are now logged in, check if we need dto fetch posts
        if (!this.props.token && nextProps.token) {
            this.fetchPostsIfNeeded(nextProps)
        }
    }
    
    fetchPostsIfNeeded(nextProps: Props) {
        const {
            token,
            isFetchingPosts,
            postsTimestamp,
            posts,
            dispatch,
            subreddit,
        } = nextProps || this.props;
        
        if (!token || isFetchingPosts) {
            return
        }
        
        // If we haven't recorded a time when we tried retrieving posts, or if there
        // are no posts and we last tried more than one minute ago, let's fetch
        // some posts.
        if (!postsTimestamp || (posts.length === 0 && Date.now() - postsTimestamp > 60 * 1000)) {
            dispatch(actionCreators.fetchPosts(subreddit))
        }
    }
    
    /**
     * Using a ScrollView
     * https://facebook.github.io/react-native/docs/using-a-scrollview.html
     */
    render() {
        const { postsError, isFetchingPosts, postsTimestamp, posts } = this.props;
        
        let renderPosts = () => posts.map((post, index) => {
            const { title, subreddit, preview } = post.data;
            return (
                <Post
                    key={index}
                    title={title}
                    subreddit={subreddit}
                    preview={preview}
                />
            )
        });
        
        return (
            <View style={styles.container}>
                {
                    postsError ?
                        <View style={styles.error}>
                            <Text>{postsError}</Text>
                        </View> :
                        null
                }
                {
                    !postsError && (isFetchingPosts || !postsTimestamp) ?
                        <View style={styles.loading}>
                            <Text>Loading...</Text>
                        </View> :
                        null
                }
                <ScrollView style={{ flex: Math.min(posts.length, 1) }}>
                    {
                        posts.length > 0 ?
                            renderPosts() :
                            null
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        flex: 1,
        backgroundColor: 'red',
        padding: 15
    },
    loading: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 15
    }
});

const mapStateToProps = (state) => ({
    item: state.sample.sampleItem,
    token: state.user.token,
    posts: state.posts.subreddits.hot,
    postsError: state.posts.error,
    postsTimestamp: state.posts.timestamp,
    isFetchingPosts: state.posts.isFetching
});

export default connect(mapStateToProps)(Posts);