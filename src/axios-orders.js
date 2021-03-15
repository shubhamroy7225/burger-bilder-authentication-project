import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-shubham-default-rtdb.firebaseio.com/'
});

export default instance;