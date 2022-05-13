require('dotenv').config();
const init = require('./initDataBases/init');
const userRepo = require('./repository/user-repository');
const trxsRepo = require('./repository/transaction-repository');

const initilaize = async () =>{
    
    const users = await init.getUsersToInit();

    for(var i = 0; i < users.length; i += 50){
    const u = users.slice(i, i+ 50);
    const d = await userRepo.initUsers(u);
    console.log(d.events.insertedUser);
    }
  
    const trxs = await init.getTransactionsToInit();
    for(var i = 0; i < trxs.length; i += 50){
        const t = trxs.slice(i, i+ 50);
        const d = await trxsRepo.initTransactions(t);
        console.log(d.events.insertedTransaction);
    }
    process.exit(0);
}

initilaize();

