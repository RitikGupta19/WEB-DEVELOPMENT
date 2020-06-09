import axios from 'axios';

export default axios.create({
    baseURL : 'https://api.unsplash.com',
    headers : {
        Authorization : 'Client-ID CuOcc232gcs5wXNbSU3N7iXXgkRAsN9NcJKvE6wb77w'
      }
});