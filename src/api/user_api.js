import api from './api';

const getLoggedInUserDetails = async () => {

    const accessToken = localStorage.getItem('access')

    try {
        const response = await api.get('/api/v1/current-user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get user details:', error);
        throw error;
    }
}

export default 
    getLoggedInUserDetails
;