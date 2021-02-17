const express = require('express');
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
});

transactionRouter.post('/', async (req, res) => {
    const data = req.body;
    try {
        const newTransaction = await transaction.save(data);
        res.status(201).send(newTransaction);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

transactionRouter.put('/', async (req, res) => {
    const data = req.body;
    try {
        const updateTransaction = await transaction.update(data);
        res.status(202).send(updateTransaction);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

transactionRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await transaction.remove(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

transactionRouter.get('/periods', async (req, res) => {
    try {
        const periods = await transaction.getPeriods();
        res.send({periods: periods});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

module.exports = transactionRouter;
