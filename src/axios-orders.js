import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-d3835.firebaseio.com/'
});

export default instance;