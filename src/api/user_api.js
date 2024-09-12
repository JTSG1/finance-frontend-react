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

export default 
    getLoggedInUserDetails
;