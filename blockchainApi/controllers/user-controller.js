const express = require('express');
const bc = require('../repository/user-repository');

exports.addUser = async (req, res, next)=>{
    const trx = req.body;
    d = await bc.addUser(trx);
    res.send({
        d
    });
}

exports.getUserById = async(req, res, next)=>{
    const id = req.params.id;
    const data = await bc.getUserById(id);
    res.send(data);
}

exports.getUserByEmail = async(req, res, next)=>{
    const email = req.params.email;
    const data = await bc.getUserByEmail(email);
    res.send(data);
}


exports.getAllUsers = async(req, res, next) => {
    const users = await bc.getAllUsers();
    res.send(users);
}


exports.initUsers = async(req, res, next)=>{
    const id = req.params.id;
    const data = await bc.initUsers();
    res.send(data);
}