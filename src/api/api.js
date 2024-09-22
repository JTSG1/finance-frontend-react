import axios from 'axios';

// Create an Axios instance with the base URL from environment variable
const api = axios.create({
    baseURL: process.env.REACT_APP_FINANCE_API_HOST,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh');
    try {
        const response = await api.post('/api/token/refresh/', {
            refresh: refreshToken,
        });
        console.log('Access token refreshed:');
        localStorage.setItem('access', response.data.access);
        return response.data;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
};

// Add a request interceptor to add the access token to all requests
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access');
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newTokens = await refreshAccessToken();
                api.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.clear();
                // Optionally, handle token refresh failure (e.g., redirect to login)
            }
        }
        return Promise.reject(error);
    }
);


export default api;