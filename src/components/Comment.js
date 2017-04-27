// @flow
import React, { Component } from 'react'
import type { Subreddit } from '../actions/PostsActions';
import { View, Text, Image, StyleSheet } from 'react-native'

type Props = {
    body: string,
    subreddit: Subreddit,
    author: string
};

export default class Comment extends Component<void, Props, void> {
    
    render() {
        const { body, subreddit, author } = this.props;
        
        let styles = StyleSheet.create({
            container: {
                height: 100,
                padding: 15,
                flexDirection: 'row',
                marginLeft: 20,
                borderTopWidth: 1,
                borderTopColor: 'rgba(0,0,0,0.3)',
            },
            thumbnailSection: {
                width: 80
            },
            textSection: {
                flex: 1
            },
            detailInfo: {
                flexDirection: 'column',
                flex: 1,
            },
            subreddit: {
                color: '#999',
                fontSize: 11,
            }
        });
        
        return (
            <View style={styles.container}>
                <View style={styles.textSection}>
                    <Text style={styles.title} numberOfLines={2}>{body}</Text>
                    <View style={styles.textSection}>
                        <Text style={styles.subreddit}>r/{subreddit}</Text>
                        <Text style={styles.subreddit}>r/{author}</Text>
                    </View>
                </View>
            </View>
        )
    }
}