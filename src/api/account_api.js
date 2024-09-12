import api from './api';

const getUsersAccounts = async (req, res) => {

    try {
        const response = await api.get('/api/v1/account/');
        return response.data;
    } catch (error) {
        console.error('Failed to get account details:', error);
        throw error;
    }

}

const getAccountBalances = async (accountId) => {

    try {
        const response = await api.get(`/api/v1/accountBalance/${accountId}/    `);
        return response.data;
    } catch (error) {
        console.error('Failed to get account balances:', error);
        throw error;
    }

}

export { getUsersAccounts, getAccountBalances };