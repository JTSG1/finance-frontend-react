import axios from 'axios';

// Create an Axios instance with the base URL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default api;