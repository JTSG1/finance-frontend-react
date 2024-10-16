import api from './api';

const getUsersAccounts = async (accountId = undefined) => {

    try {
        let response = "";
        if(accountId === undefined){
            response = await api.get('/api/v1/account/')
        } else {
            response = await api.get(`/api/v1/account/${accountId}/`)
        }
        return response.data;
    } catch (error) {
        console.error('Failed to get account details:', error);
        throw error;
    }

}

const getAccountBalances = async (accountId) => {

    try {
        const response = await api.get(`/api/v1/accountBalance/${accountId}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to get account balances:', error);
        throw error;
    }

}

const getAccountTransactions = async (accountId) => {

    try{
        const response = await api.get(`api/v1/transaction/account/${accountId}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to get account transactions:', error);
        throw error;
    }

}

export { getUsersAccounts, getAccountBalances, getAccountTransactions };