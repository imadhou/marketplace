const Web3 = require('web3');
var mysql = require('mysql');

const web3 = new Web3(Web3.givenProvider || process.env.WSPROVIDER);
const contract = new web3.eth.Contract(require('./../abi.json'));
contract.options.address = process.env.ADDRESS;
const account = process.env.ACCOUNT;

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "blockchain",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.addTransaction = async (trx) =>{
    contract
    .methods
    .addTransaction(from= trx.from, to= trx.to, itemId= trx.itemId, price= trx.price, txType= trx.txType, date= Math.round((new Date()).getTime()/1000))
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
    return trxs;
}

exports.getLastTransactions = async () =>{
    
    let transactions = [];
    let transactions_id = [];
    let sql = `SELECT * FROM (
        SELECT * FROM product ORDER BY id DESC LIMIT 20
    ) sub
    ORDER BY id ASC`;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        for ( var i = 0; i < result.length; i++ ) {
            let tr = {};
        tr.id = result[i].id;
        tr.product_id = result[i].product_id;
        tr.product_name = result[i].product_name;
        tr.product_category = result[i].product_category;
        tr.product_description = result[i].product_description;
        tr.product_specification = result[i].product_specification;
        tr.product_img = result[i].product_img;
        tr.product_price = result[i].product_price;
        transactions.push(tr);
        transactions_id.push(tr.id);
        }
    // console.log(transactions);
      });
    data = await contract.methods.getAllTransactions().call();
    const trxs = [];
    data.map(data => {
        // console.log(transactions_id.includes(parseInt(data.id)) );
        if ( transactions_id.includes(parseInt(data.id)) ) {
            //console.log(data.id);
            let tr = transactions[transactions_id.indexOf(parseInt(data.id))];
            trxs.push ({
            id: data.id,
            product_id: tr.product_id,
            product_name: tr.product_name,
            product_category: tr.product_category,
            product_description: tr.product_description,
            product_specification: tr.product_specification,
            product_img: tr.product_img,
            from: data.from,
            to: data.to,
            itemId: data.itemId,
            price: data.price,
            txType: data.txType,
            date: new Date(data.date * 1000)
        }) }
    });
    return trxs;
}

exports.getTransactionById = async (id) =>{

    let sql = `SELECT * FROM product WHERE id = ${id}`;
    let tr = {};
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        tr.id = result[0].id;
        tr.product_id = result[0].product_id;
        tr.product_name = result[0].product_name;
        tr.product_category = result[0].product_category;
        tr.product_description = result[0].product_description;
        tr.product_specification = result[0].product_specification;
        tr.product_img = result[0].product_img;
        tr.product_price = result[0].product_price;
    });

    const data = await contract.methods.getTransactionById(id).call();
    const trx =  {
            id: data.id,
            product_id: tr.product_id,
            product_name: tr.product_name,
            product_category: tr.product_category,
            product_description: tr.product_description,
            product_specification: tr.product_specification,
            product_img: tr.product_img,
            from: data.from,
            to: data.to,
            itemId: data.itemId,
            price: data.price,
            txType: data.txType,
            date: new Date(data.date * 1000)
    };
    return trx;
}

exports.query = async (q) => {
    const data = await contract.methods.query(from=q.from? q.from: "", to=q.to? q.to: "", txType=q.txType? q.txType: 0, operator=q.operator).call();
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
    return trxs;
}

exports.searchTransactions = async (query) =>{
    const data = await contract.methods.searchTransactions(query.from, query.to, query.txType, query.operator).call();
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

exports.initTransactions = async (transactions) =>{
    const date = Math.round((new Date()).getTime()/1000);
    /*const transactions = [
        [0, "a", "b", 1, date, 0, 200],
        [1, "a", "b", 3, date, 1, 300],
        [2, "a", "c", 3, date, 2, 500],
        [3, "a", "d", 2, date, 3, 200],
        [4, "a", "b", 3, date, 10, 900],
        [5, "b", "a", 3, date, 20, 800],
        [6, "b", "c", 3, date, 8, 500],
        [7, "b", "a", 3, date, 9, 200],
        [8, "b", "a", 2, date, 7, 250],
        [9, "c", "b", 2, date, 12, 360],
        [10, "c", "e", 2, date, 13, 210],
        [11, "d", "e", 3, date, 25, 20],
        [12, "e", "a", 2, date, 26, 10],
        [13, "e", "d", 2, date, 37, 35],
        [14, "f", "b", 3, date, 22, 25],
        [15, "f", "a", 3, date, 26, 80]]*/

    const d = await contract
    .methods
    .initTransactions(transactions)
    .send({ from: account });
    return d;
}


// exports.query({from: "a", to: "", txType: -1})
// exports.getTransactionById(2)
// exports.getAllTransactions();
// exports.getTransactionsByDbIds([5,6,7])
// exports.addTransaction({dbId: 30, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
// exports.addTransaction({dbId: 51, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
// exports.addTransaction({dbId: 52, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
// exports.addTransaction({dbId: 53, from: "a", to: "b", itemId: 5, price: 500, txType: 5});
