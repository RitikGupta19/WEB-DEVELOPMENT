import axios from 'axios';

const KEY = 'AIzaSyDi6LK2n0HLGNf6elP7tWAosvahH5kpFAw';

// Instance for all future requests created
export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet' ,
        maxResults : 4,
        key: KEY
    }
});

