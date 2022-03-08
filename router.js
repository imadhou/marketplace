const express = require('express');
const router = express.Router();
const bc = require('./bc');

getTransaction = async (req, res, next)=>{
    const id = req.params.id;
    const data = await bc.getTransactionById(id);
    res.send(data);
}

insertTransaction = async (req, res, next)=>{
    const trx = req.body;
    const data = await bc.insertTransaction(trx);
    res.send(data);
}

getAllTransactions = async (req, res, next)=>{
    const data = await bc.getAllTransactions();
    res.send(data);
}

getAllTransactionsForUser = async (req, res, next)=>{
    const user = req.params.user;
    const data = await bc.getAllTransactionsForUser(user);
    res.send(data);
}

getAllTransactionsByType = async (req, res, next)=>{
    const trxType = req.params.type;
    console.log(trxType)
    const data = await bc.getAllTransactionsByType(trxType);
    res.send(data);
}

router.get('/transactions',getAllTransactions);
router.get('/transactions/users/:user', getAllTransactionsForUser);
router.get('/transactions/types/:type', getAllTransactionsByType);
router.get('/transactions/:id',getTransaction);
router.post('/transactions',insertTransaction);


module.exports = router;