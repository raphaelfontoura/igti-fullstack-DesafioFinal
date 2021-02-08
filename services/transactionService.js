const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (filter) => {
    // console.log(filter);
    if (filter === undefined || filter === "") {
        throw new Error("Obrigatório informar o período no formato yyyy-mm. </transaction?period=yyyy-mm>");
    }
    const transactions = await TransactionModel.find({ yearMonth: filter });
    return transactions;
};

const save = async (data) => {
    const newTransaction = new TransactionModel(data);
    try {
        await newTransaction.save();
        return newTransaction;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    findAll,
    save,
};