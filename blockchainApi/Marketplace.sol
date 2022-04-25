// SPDX-License-Identifier: SPDX-License
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Marketplace {

    struct ITransaction {
        uint256 id;
        string from;
        string to;
        int256 txType;
        uint256 date;
        uint256 itemId;
        uint256 price;
    }

    struct IUser {
        uint256 id;
        string email;
        string password;
        string pseudo;
    }

    mapping(string => IUser) users;
    mapping(uint256 => string) userIds;
    uint256 usersCount;

    mapping(uint256 => ITransaction) transactions;
    mapping(string => uint256[]) fromUser;
    mapping(string => uint256[]) toUser;
    mapping(int256 => uint256[]) types;
    mapping(uint256 => uint256) dbIds;
    uint256 count;

    event insertedTransaction(uint256 indexed id);
    event insertedUser(uint256 indexed id);

    function initUsers(IUser[] memory usersToInit) public returns (bool) {
        for (uint256 i = 0; i < usersToInit.length; i++) {
            IUser memory u = usersToInit[i];
            addUser(u.email, u.password, u.pseudo);
        }
        return true;
    }

    function initTransactions(ITransaction[] memory transactionsToInit) public returns(bool){
        for(uint i = 0; i < transactionsToInit.length; i++){
            addTransaction(transactionsToInit[i].from, transactionsToInit[i].to, transactionsToInit[i].itemId, transactionsToInit[i].price, transactionsToInit[i].txType, transactionsToInit[i].date);
        }
        return true;
    }

    function addUser( string memory email, string memory password, string memory pseudo) public returns (uint256) {
        uint256 _userID = usersCount++;

        IUser memory u = IUser(_userID, email, password, pseudo);
        users[email] = u;
        userIds[_userID] = email;
        emit insertedUser(_userID);
        return (_userID);
    }

    function getUserByEmail(string memory email) public view returns (IUser memory){
        return users[email];
    }

    function getUserById(uint256 id) public view returns (IUser memory) {
        string memory email = userIds[id];
        return (users[email]);
    }

    function getAllUsers() public view returns (IUser[] memory usr){
        usr = new IUser[](usersCount);

        for(uint i = 0; i < usersCount; i++){
            IUser memory u = users[userIds[i]];
            usr[i] =u;
        }
    }

    function addTransaction( string memory from, string memory to, uint256 itemId, uint256 price, int256 txType, uint256 date) public returns (uint256) {
        uint256 _id = count++;
        ITransaction memory trx = ITransaction( _id, from, to, txType, date, itemId, price);
        transactions[_id] = trx;

        if(compare(from, "") != 0){
            fromUser[trx.from].push(_id);
        }
        if(compare(to, "") != 0){
            toUser[trx.to].push(_id);
        }
        if(txType != 0){
            types[trx.txType].push(_id);
        }
        return (_id);
    }

    function getAllTransactions() public view returns (ITransaction[] memory trxs){
        trxs = new ITransaction[](count);
        for (uint256 i = 0; i < count; i++) {
            ITransaction memory trx = transactions[i];
            trxs[i] = trx;
        }
    }

    function getTransactionById(uint256 id) public view returns (ITransaction memory){
        return (transactions[id]);
    }

    function query( string memory from, string memory to, int256 txType, string memory operator) public view returns (ITransaction[] memory) {
        uint256[] memory fromTransactions = fromUser[from];
        uint256[] memory toTransactions = toUser[to];
        uint256[] memory txTypes = types[txType];

        ITransaction[] memory trxs = new ITransaction[](fromTransactions.length + toTransactions.length + txTypes.length);
        uint index = 0;

        if (compare(operator, "OR") == 0) {
            if (compare(from, "") != 0) {
                for (uint256 i = 0; i < fromTransactions.length; i++) {
                    trxs[index] = transactions[fromTransactions[i]];
                    index++;
                }
            }
            if (compare(to, "") != 0) {
                for (uint256 i = 0; i < toTransactions.length; i++) {
                    trxs[index] = transactions[toTransactions[i]];
                    index++;
                }
            }
            if (txType != 0) {
                for (uint256 i = 0; i < txTypes.length; i++) {
                    trxs[index] = transactions[txTypes[i]];
                    index++;
                }
            }
        } else {

            if(compare(from, "") != 0 && compare(to, "") != 0 && txType != 0){
                for (uint256 i = 0; i < fromTransactions.length; i++) {
                    ITransaction memory transaction = transactions[fromTransactions[i]];
                    if(compare(to, transaction.to) == 0 && transaction.txType == txType){
                        trxs[index] = transaction;
                        index++;
                    }
                }
            }else if(compare(from, "") != 0 && compare(to, "") != 0 && txType == 0){
                for (uint256 i = 0; i < fromTransactions.length; i++) {
                    ITransaction memory transaction = transactions[fromTransactions[i]];
                    if(compare(to, transaction.to) == 0){
                        trxs[index] = transaction;
                        index++;
                    }
                }
            }else if(compare(from, "") != 0 && compare(to, "") == 0 && txType != 0){
                for (uint256 i = 0; i < fromTransactions.length; i++) {
                    ITransaction memory transaction = transactions[fromTransactions[i]];
                    if(transaction.txType == txType){
                        trxs[index] = transaction;
                        index++;
                    }
                }
            }else if(compare(from, "") != 0 && compare(to, "") == 0 && txType == 0){
                for (uint256 i = 0; i < fromTransactions.length; i++) {
                    ITransaction memory transaction = transactions[fromTransactions[i]];
                    trxs[index] = transaction;
                    index++;
                }
            }else if(compare(from, "") == 0 && compare(to, "") != 0 && txType != 0){
                for (uint256 i = 0; i < toTransactions.length; i++) {
                    ITransaction memory transaction = transactions[toTransactions[i]];
                    if(transaction.txType == txType){
                        trxs[index] = transaction;
                        index++;
                    }
                }
            }else if(compare(from, "") == 0 && compare(to, "") != 0 && txType == 0){
                for (uint256 i = 0; i < toTransactions.length; i++) {
                    ITransaction memory transaction = transactions[toTransactions[i]];
                    trxs[index] = transaction;
                    index++;
                }
            }else if(compare(from, "") == 0 && compare(to, "") == 0 && txType != 0){
                for (uint256 i = 0; i < txTypes.length; i++) {
                    ITransaction memory transaction = transactions[txTypes[i]];
                    trxs[index] = transaction;
                    index++;
                }
            }
        }
        return trxs; 
    }


    function compare(string memory _a, string memory _b) private pure returns (int256){
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint256 minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint256 i = 0; i < minLength; i++)
            if (a[i] < b[i]) return -1;
            else if (a[i] > b[i]) return 1;
        if (a.length < b.length) return -1;
        else if (a.length > b.length) return 1;
        else return 0;
    }
}
