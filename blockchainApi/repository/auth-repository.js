require('dotenv').config({path: '../'})


const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

console.log(process.env.JWT_SECRET)
//signing a jwt (the user id is wrapped in the payload)
const signToken = (email) =>
  jwt.sign({ id: email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });


  //creating the token and sending it through the response body and in a cookie
const createAndSendToken = (user, statusCode, resp) => {
    const token = signToken(user.email);
    resp.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: user,
      },
    });
  };

  console.log(signToken("aaa@aaa.aaa"))