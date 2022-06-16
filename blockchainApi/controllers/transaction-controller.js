const express = require('express');
const bc = require('../repository/transaction-repository');
const axios = require('axios');

// body should be an object = {dbId: 30, from: "a@a.a", to: "b@b.b", itemId: 5, price: 500, txType: 5}
// response is an empty object for instance because data inserted asyncronously
exports.addTransaction = async (req, res, next)=>{
    const trx = req.body;
    const d = await bc.addTransaction(trx);
    res.send({
        d
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

exports.getLastTransactions = async (req, res, next)=>{
    let data;
    if(req.query.user){
        const url = "http://127.0.0.1:5000/history";
        const user = req.query.user;
        const userTransactionsQuery = {
            from:{
                field:"from",
                values:[user],
                operator: "in"
            },
            to:{
                field:"",
                values:[],
                operator: ""
            },
            txType:{
                field:"txType",
                values:[2, 3],
                operator: "in"
            },
            "operator": "AND"
        }
        data = await bc.searchTransactions(userTransactionsQuery); 
        productIds = data.map(d => d.itemId);
        const productNames = await bc.getProductNames(productIds);
        const d = await axios({
            method: "POST",
            url: url,
            data: {
                items: productNames
            }
        });
        data = await bc.getLastTransactions(d.data.slice(0,20));

    }else{
        data = await bc.getLastTransactions();
    }
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
    const d = await bc.initTransactions();
    res.send(d)
}
exports.getTransactionsByItemIds = async(req, res, next) =>{
    const d = await bc.getTransactionsByItemIds(req.body);
    res.send(d)
}

exports.getRecommandation = async(req, res, next) =>{
    const url = "http://127.0.0.1:5000/history";
    const d = await axios({
        method: "POST",
        url: url,
        data: {
            items: [req.body.item]
        }
    });
    if ( d.data.length === 0 ) {
        return res.send();
    }
    data = await bc.getLastTransactions(d.data.slice(0,20));
    res.send(data);
}

exports.getTransactionsByProductNames = async(req, res, next) =>{
    const d = await bc.getTransactionsByProductNames(req.params.name);
    res.send(d)
}
