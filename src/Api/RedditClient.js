// @flow
export default class RedditClient {
    
    baseUrl: string;
    defaultHeaders: {
        'Authorization': string
    };
    
    constructor(token: string) {
        this.baseUrl = 'https://oauth.reddit.com/';
        this.defaultHeaders = {
            'Authorization': `bearer ${token}`,
        }
    }
    
    getPosts = (endpoint: string) => this.fetchWithHeaders(this.baseUrl + endpoint);
    getRandom = () => this.fetchWithHeaders(this.baseUrl + '/random');
    
    fetchWithHeaders = (url: string) => (
        fetch(url, {
            headers: this.defaultHeaders
        }).then((response) => response.json())
    );
}