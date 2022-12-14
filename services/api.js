import axios from 'axios';

const api = axios.create({
    baseURL: 'https://easycode-backend.herokuapp.com'
});

export default api;
