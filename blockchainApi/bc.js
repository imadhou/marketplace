require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || process.env.WSPROVIDER);


const contract = new web3.eth.Contract(require('./abi.json'));
contract.options.address = process.env.ADDRESS;
const account = process.env.ACCOUNT;


exports.addTransaction = async (trx) =>{
    contract.methods
        .addTransaction(dbId= trx.dbId, from= trx.from, to= trx.to, itemId= trx.itemId, price= trx.price, txType= trx.txType, date= Math.round((new Date()).getTime()/1000))
        .send({ from: account });
}

exports.getAllTransactions = async () =>{
    data = await contract.methods.getAllTransactions().call();
    const trxs = data.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            itemId: data.itemId,
            price: data.price,
            txType: data.txType,
            date: new Date(data.date * 1000)
        }
    });
    console.log(trxs)
    return trxs;
}

exports.getTransactionById = async (id) =>{
    const data = await contract.methods.getTransactionById(id).call();
    const trx =  {
        id: data.id,
        from: data.from,
        to: data.to,
        itemId: data.itemId,
        price: data.price,
        txType: data.txType,
        date: new Date(data.date * 1000)
    };
    console.log(trx)
    return trx;
}

exports.query = async (q) => {
    const data = await contract.methods.query(from=q.from? q.from: "", to=q.to? q.to: "", txType=q.txType? q.txType: "").call();
    trxs = data.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            itemId: data.itemId,
            price: data.price,
            txType: data.txType,
            date: new Date(data.date * 1000)
        }
    });
    console.log(trxs)
    return trxs;
}

exports.getTransactionsByDbIds = async (ids)=>{
    const data = await contract.methods.getTransactionsByDbIds(ids).call();
    trxs = data.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            itemId: data.itemId,
            price: data.price,
            txType: data.txType,
            date: new Date(data.date * 1000)
        }
    });
    console.log(trxs)
    return trxs;
}

exports.listenToInsertedEvents = async ()=>{
    let options = {
        filter: {
            value: [],
        },
        fromBlock: 0
    };
    
    contract.events.insertedTransaction(options)
    .on('data', event => console.log('data',event))
    .on('changed', changed => console.log('changed',changed))
    .on('error', err => console.log('error',err))
    .on('connected', str => console.log('connected',str))
}


// exports.query({from: "a", to: "", txType: -1})
// exports.getTransactionById(2)
// exports.getAllTransactions();
// exports.getTransactionsByDbIds([5,6,7])
exports.addTransaction({dbId: 30, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
exports.addTransaction({dbId: 51, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
exports.addTransaction({dbId: 52, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
exports.addTransaction({dbId: 53, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
exports.listenToInsertedEvents();
