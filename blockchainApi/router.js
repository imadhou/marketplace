const express = require('express');
const router = express.Router();
const bc = require('./bc');

// body should be an object = {dbId: 30, from: "a@a.a", to: "b@b.b", itemId: 5, price: 500, txType: 5}
// response is an empty object for instance because data inserted asyncronously
addTransaction = async (req, res, next)=>{
    const trx = req.body;
    bc.addTransaction(trx);
    res.send({
        
    });
}

getTransactionById = async (req, res, next)=>{
    const id = req.params.id;
    const data = await bc.getTransactionById(id);
    res.send(data);
}

getAllTransactions = async (req, res, next)=>{
    const data = await bc.getAllTransactions();
    res.send(data);
}

getTransactionsByDbIds = async (req, res, next)=>{
    const data = await bc.getTransactionsByDbIds(req.body);
    res.send(data);
}

getTransactionsByquery = async (req, res, next)=>{
    const data = await bc.query(req.body);
    res.send(data);
}


router.post('/transactions',addTransaction);
router.get('/transactions',getAllTransactions);
router.get('/transactions/:id',getTransactionById);
router.post('/transactions/dbIds', getTransactionsByDbIds);
router.post('/transactions/query', getTransactionsByquery);

module.exports = router;