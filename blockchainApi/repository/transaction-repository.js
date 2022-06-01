const Web3 = require('web3');
var mysql = require('mysql');
const util = require('util');
const users = require('../initDataBases/init');


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
    const d = await contract
    .methods
    .addTransaction(from= trx.from, to= trx.to, itemId= trx.itemId, price= trx.price, txType= trx.txType, date= Math.round((new Date()).getTime()/1000))
    .send({ from: account });
    console.log(d);
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
exports.searchTransactions = async (query) =>{
    try{
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
        trxs = trxs.filter(t => t.txType != 0);
        return trxs;
    }
    catch(err){
        console.log(err)
    }
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

exports.getTransactionsByItemIds = async (query)=>{
    const data = await contract.methods.getTransactionsByItemIds(query.ids).call();
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

exports.initTransactions = async () =>{
    const usersData = await users.getUsersToInit();
    const query = util.promisify(con.query).bind(con);
    const sqlQuery = "SELECT id, product_price FROM product";
    const data = await query(sqlQuery);
    const trxs = [];
    data.map(d => {
        const date = Math.round((new Date()).getTime()/1000);
        let price = parseInt(d.product_price.substr(1));
        if(!price){
            price = 10;
        }
        const fromId = Math.floor(Math.random()*(148 - 1) +1);
        const fromId2 = Math.floor(Math.random()*(148 - 1) +1);
        const fromId3 = Math.floor(Math.random()*(148 - 1) +1);


        let toId = Math.floor(Math.random()*(148 - 1) + 1);
        while(toId === fromId){
            toId = Math.floor(Math.random()*(148 - 1) + 1);
        }
        const from = usersData.find(u => u.id === fromId).email;
        const from2 = usersData.find(u => u.id === fromId2).email;
        const from3 = usersData.find(u => u.id === fromId3).email;        
        trxs.push({
            id: 0,
            price,
            from,
            to: "",
            txType: 1,
            date,
            itemId: d.id
            });

        //offer
        const istr2 = Math.floor(Math.random() * 2); 
        //purchase
        const istr3 = Math.floor(Math.random() * 2);
        //seller reject
        const istr4 = Math.floor(Math.random() * 2);
        //buyer cancel
        const istr5 = Math.floor(Math.random() * 2);
        //seller accepts
        const istr6 = Math.floor(Math.random() * 2);

        const proposedPrice = Math.abs(price + Math.floor(Math.random() * (10 + 10) -10));
        if(istr2){
            trxs.push({
                id: 0,
                price: proposedPrice,
                from: from2,
                to: from,
                txType: 2,
                date: date+60*60*5,
                itemId: d.id
            })
        }

        if(istr3){
            trxs.push({
                id: 0,
                price,
                from: from3,
                to: from,
                txType: 3,
                date: date+60*60*5,
                itemId: d.id
            })
        }
        if(istr3 && istr4){
            trxs.push({
                id: 0,
                price: proposedPrice,
                from: from2,
                to: from,
                txType: 4,
                date: date+60*60*5,
                itemId: d.id
            })
        }

        if(istr3 && istr5){
            trxs.push({
                id: 0,
                price,
                from: from3,
                to: from,
                txType: 5,
                date: date+60*60*5,
                itemId: d.id
            })
        }
        if(istr3 && !istr4 && !istr5 && istr6){
            trxs.push({
                id: 0,
                price,
                from: from3,
                to: from,
                txType: 6,
                date: date+60*60*5,
                itemId: d.id
            })
        }
        if(istr2 && !istr4 && !istr5 && istr6){
            trxs.push({
                id: 0,
                price: proposedPrice,
                from: from2,
                to: from,
                txType: 6,
                date: date+60*60*5,
                itemId: d.id
            })
        }
    })
    for(let i = 0; i < trxs.length; i += 300){
        ts = trxs.slice(i, i+300);
        const d = await contract
        .methods
        .initTransactions(ts)
        .send({ from: account});
        console.log(d);
    }

}