import axios from 'axios';

// Create an Axios instance with the base URL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

export default api;