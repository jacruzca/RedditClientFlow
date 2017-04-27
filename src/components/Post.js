// @flow
import React, { Component } from 'react';
import type { Subreddit, Preview } from '../actions/PostsActions';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
    title: string,
    subreddit: Subreddit,
    preview: Preview
};
export default class Post extends Component<void, Props, void> {
    
    render() {
        const { title, subreddit, preview } = this.props;
        
        let styles = StyleSheet.create({
            container: {
                height: 100,
                padding: 15,
                flexDirection: 'row'
            },
            thumbnailSection: {
                width: 80
            },
            textSection: {
                flex: 1
            },
            title: {},
            subreddit: {
                color: '#999',
                fontSize: 11
            }
        });
        
        // Try to pick an image
        let image;
        try {
            image = preview.images[0].source.url;
        } catch (e) {
        
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.thumbnailSection}>
                    {
                        image ?
                            <Image
                                style={{ width: 60, height: 60 }}
                                source={{ uri: image }}
                            /> :
                            <View
                                style={{ width: 60, height: 60, backgroundColor: '#eee' }}
                            />
                    }
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    <Text style={styles.subreddit}>r/{subreddit}</Text>
                </View>
            </View>
        )
    }
}