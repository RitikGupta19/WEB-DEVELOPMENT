import axios from 'axios';

const KEY = process.env.REACT_APP_KEY;

// Instance for all future requests created
export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippe',
        maxResults : 1,
        key: KEY
    }
});

