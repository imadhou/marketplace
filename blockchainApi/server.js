const express = require('express');
const errorHandler = require('./errors/error-handler');
const NotFoundError = require('./errors/not-found-error');

require('dotenv').config();


const userRouter = require('./routes/user-router');
const authRouter = require('./routes/auth-router');
const transactionRouter = require('./routes/transaction-router');

const app = express();


app.use(express.json());

//app.use('/api/auth',authRouter);
app.use('/api/transactions',transactionRouter);
app.use('/api/users',userRouter);

app.all('*', (req, resp, next) => {
    next(new NotFoundError(`can't find ${req.originalUrl} on the server`, 404));
  });

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


