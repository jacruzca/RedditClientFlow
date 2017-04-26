// @flow
import { AsyncStorage } from 'react-native';
const TOKEN_KEY: string = '@RedditClient:token';
const EXPIRE_KEY: string = '@RedditClient:expire';

export const clearToken = async () => {
    AsyncStorage.removeItem(EXPIRE_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
};

export const setToken = async (token: string) => {
    AsyncStorage.setItem(EXPIRE_KEY, Date.now().toString());
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);

export const tokenHasExpired = async () => {
    const expiration = await AsyncStorage.getItem(EXPIRE_KEY);
    if (!expiration) {
        return true;
    }
    
    const difference = Date.now() - Number(expiration);
    return difference > 600000;
};