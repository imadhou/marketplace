const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
const contract = new web3.eth.Contract(require('./abi.json'));
contract.options.address = '0x25A909cC90A740462FeeB8a31815cB7d725fF425';



exports.insertTransaction = async (trx) =>{
    const data = await contract.methods
        .insertTransaction(trx.from, trx.to, trx.price, trx.item, trx.transactionType)
        .send({ from: "0x98b387Ab36345b34eA5303b19a09c6C2eB7171fF" });
        return data;
}

exports.getAllTransactions = async () =>{
    data = await contract.methods.getAllTransactions().call();
    trxs = data.filter(t => t.id != 0);
    trxs = trxs.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            price: data.price,
            item: data.item,
            transactionType: data.transactionType
        }
    });
    return trxs;
}

exports.getTransactionById = async (id) =>{
    const data = await contract.methods.getTransactionById(id).call();
    const trx =  {
        id: data.id,
        from: data.from,
        to: data.to,
        price: data.price,
        item: data.item,
        transactionType: data.transactionType
    };
    return trx;
}

exports.getAllTransactionsByType = async (type) => {
    const data = await contract.methods.getAllTransactionsByType(type).call();
    trxs = data.filter(t => t.id != 0);
    trxs = trxs.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            price: data.price,
            item: data.item,
            transactionType: data.transactionType
        }
    });
    return trxs;
}

exports.getAllTransactionsForUser = async (user) =>{
    const data = await contract.methods.getAllTransactionsForUser(user).call();
    trxs = data.filter(t => t.id != 0);
    trxs = trxs.map(data => {
            return {
            id: data.id,
            from: data.from,
            to: data.to,
            price: data.price,
            item: data.item,
            transactionType: data.transactionType
        }
    });
    return trxs;
}
