const express = require('express');
const { restart } = require('nodemon');
const transaction = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.get('/', async (req, res) => {
    const filter = req.query.period;
    try {
        const transactions = await transaction.findAll(filter);
        res.send(transactions);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

transactionRouter.post('/', async (req, res) => {
    const data = req.body;
    try {
        const newTransaction = await transaction.save(data);
        res.send(newTransaction);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

module.exports = transactionRouter;
