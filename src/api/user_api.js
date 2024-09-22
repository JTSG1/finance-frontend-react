import api from './api';

const getLoggedInUserDetails = async () => {

    try {
        const response = await api.get('/api/v1/current-user');
        return response.data;
    } catch (error) {
        console.error('Failed to get user details:', error);
        throw error;
    }
}

const getUsersProviders = async (withCredentials = true) => {
    try {
        if (withCredentials) {
            const response = await api.get('/api/v1/provider/with_credentials');
            return response.data;
        } else {
            const response = await api.get('/api/v1/provider/without_credentials');
            return response.data;
        }
    } catch (error) {
        console.error('Failed to get user providers:', error);
        throw error;
    }
}

export { getUsersProviders, getLoggedInUserDetails }; 