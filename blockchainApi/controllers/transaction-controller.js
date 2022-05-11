const express = require('express');
const bc = require('../repository/transaction-repository');
const init = require('../initDataBases/init');

// body should be an object = {dbId: 30, from: "a@a.a", to: "b@b.b", itemId: 5, price: 500, txType: 5}
// response is an empty object for instance because data inserted asyncronously
exports.addTransaction = async (req, res, next)=>{
    const trx = req.body;
    bc.addTransaction(trx);
    res.send({
    });
}

exports.getTransactionById = async (req, res, next)=>{
    const id = req.params.id;
    const data = await bc.getTransactionById(id);
    res.send(data);
}

exports.getAllTransactions = async (req, res, next)=>{
    const data = await bc.getAllTransactions();
    res.send(data);
}

exports.getTransactionsByquery = async (req, res, next)=>{
    const data = await bc.query(req.body);
    res.send(data);
}

exports.searchTransactions = async (req, res, next) =>{
    const data = await bc.searchTransactions(req.body);
    res.send(data);
}

exports.initTransactions = async(req, res, next) =>{
    const d = await init.init();
    res.send(d)
}