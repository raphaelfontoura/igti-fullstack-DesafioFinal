import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-type': 'application/json',
    },
});

const getPeriod = async (period) => {
    const transactions = await api.get(`/api/transaction?period=${period}`);
    return transactions.data;
}

const getAllPeriods = async () => {
    const allPeriods = await api.get('/api/transaction/periods');
    return allPeriods;
}

const updateTransaction = async (transaction) => {
    const updated = await api.put(`/api/transaction`, transaction);
    return updated;
}

const deleteTransaction = async (id) => {
    const deleted = await api.delete(`/api/transaction/${id}`);
    return deleted;
}

const createTransaction = async (transaction) => {
    const created = await api.post('api/transaction/',transaction);
    return created;
}

export default {
    getPeriod,
    getAllPeriods,
    updateTransaction,
    deleteTransaction,
    createTransaction,
}