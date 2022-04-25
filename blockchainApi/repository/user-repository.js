const Web3 = require('web3');


const web3 = new Web3(Web3.givenProvider || process.env.WSPROVIDER);
const contract = new web3.eth.Contract(require('./../abi.json'));
contract.options.address = process.env.ADDRESS;
const account = process.env.ACCOUNT;

exports.addUser = async (trx) =>{
    const d = await contract
    .methods
    .addUser(email= trx.email, pseudo= trx.pseudo, password= trx.password)
    .send({ from: account });
    return {id: d.events.insertedUser.returnValues.id};
}


exports.getUserById = async (id) =>{
    const data = await contract.methods.getUserById(id).call();
    const trx =  {
        id: data.id,
        email: data.email,
        pseudo: data.pseudo,
        password: data.password
    };
    return trx;
}

exports.getUserByEmail = async (email) =>{
    const data = await contract.methods.getUserByEmail(email).call();
    const trx =  {
        id: data.id,
        email: data.email,
        pseudo: data.pseudo,
        password: data.password
    };
    return trx;
}

exports.getAllUsers = async () =>{
    const datas = await contract.methods.getAllUsers().call();
    const users =  datas.map (data => {
        return {
            id: data.id,
            email: data.email,
            pseudo: data.pseudo,
            password: data.password
        }
    });
    return users;
}



exports.initUsers = async () =>{
    const users = [
        [0, "a", "a", "a"],
        [1, "b", "b", "a"],
        [2, "c", "c", "c"],
        [3, "d", "d", "d"],
        [4, "e", "e", "e"],
        [5, "f", "f", "f"],
        [6, "g", "g", "g"],
        [8, "h", "h", "h"],
    ];

    const d = await contract
    .methods
    .initUsers(users)
    .send({ from: account });
    console.log(d);
    return d;
}
