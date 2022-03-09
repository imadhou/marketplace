# marketplace
il faut intaller geth  


1- clone the repo  
2- run "npm install"  
3- run "node server.js"  

routes are defined as following:  

api/transactions => getAllTransactions  
api/transactions/users/:user => getAllTransactionsForUser  
api/transactions/types/:type => getAllTransactionsByType    
api/transactions/:id => getTransaction    
api/transactions => insertTransaction  set the body to something like: {
    "from": "a@a.a",
    "to": "b@b.b",
    "price": "500",
    "item": "car",
    "transactionType": "sell"
}  
