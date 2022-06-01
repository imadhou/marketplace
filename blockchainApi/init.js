require('dotenv').config();
const init = require('./initDataBases/init');
const userRepo = require('./repository/user-repository');
const trxsRepo = require('./repository/transaction-repository');

const initilaize = async () =>{
    
    const users = await init.getUsersToInit();
    for(var i = 0; i < users.length; i += 100){
        const u = users.slice(i, i+ 100);
        const d = await userRepo.initUsers(u);
        console.log(d.events.insertedUser);
    }

    const d = await trxsRepo.initTransactions();
    process.exit(0);
}

initilaize();

