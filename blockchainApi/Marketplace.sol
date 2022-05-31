// SPDX-License-Identifier: SPDX-License
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Marketplace {

    struct ITransaction {
        uint256 id;
        string from;
        string to;
        uint256 txType;
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

// eq, neq, eql, eqh, in, nin
    string constant eq = "eq";
    string constant neq = "neq";
    string constant eql = "eql";
    string constant eqh = "eqh";
    string constant _in = "in";
    string constant nin = "nin";

    struct Transactions{
        uint256[] transactions;
        uint256 size;
    }

    struct StringQuery{
        string field;
        string operator;
        string[] values;
    }

    struct IntQuery{
        string field;
        string operator;
        uint256[] values;
    }

    mapping(string => IUser) users;
    mapping(uint256 => string) userIds;
    uint256 usersCount;

    mapping(uint256 => ITransaction) transactions;
    mapping(string => uint256[]) fromUser;
    mapping(string => uint256[]) toUser;
    mapping(uint256 => uint256[]) types;
    mapping(uint256 => uint256[]) dbIds;
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

    function addTransaction( string memory from, string memory to, uint256 itemId, uint256 price, uint256 txType, uint256 date) public returns (uint256) {
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
        dbIds[trx.itemId].push(_id);
        emit insertedTransaction(_id);
        return (_id);
    }

    function getAllTransactions() public view returns (ITransaction[] memory trxs){
        trxs = new ITransaction[](count);
        for (uint256 i = 0; i < count; i++) {
            ITransaction memory trx = transactions[i];
            trxs[i] = trx;
        }
    }

    function getTransactionsByItemIds(uint256[] memory ids) public view returns (ITransaction[] memory trxs){
        uint s = 0;
        for(uint i = 0; i < ids.length; i++){
            s = s + dbIds[ids[i]].length;
        }
        trxs = new ITransaction[](s);
        s = 0;
        for(uint i = 0; i < ids.length; i++){
            
            for(uint j = 0; j < dbIds[ids[i]].length; j++){
                ITransaction memory trx = transactions[dbIds[ids[i]][j]];
                trxs[s] = trx;
                s++;
            }
        }
        return trxs;
    }

    function getTransactionById(uint256 id) public view returns (ITransaction memory){
        return (transactions[id]);
    }


    function getFromTransactionsIds(StringQuery memory fromMails) private view returns(Transactions memory){

        uint index = 0;
        uint256[] memory trxs;

        if(compare(fromMails.operator, eq) == 0){
            trxs = new uint256[](fromUser[fromMails.values[0]].length);
            for(uint i = 0; i < fromUser[fromMails.values[0]].length; i++){
                trxs[index] = fromUser[fromMails.values[0]][index];
                index++;

            }
            
        }else if(compare(fromMails.operator, _in) == 0){
            uint size = 0;
            for(uint i = 0; i < fromMails.values.length; i++){
                size = size + fromUser[fromMails.values[i]].length;
            }

            trxs = new uint256[](size);
            for(uint i = 0; i < fromMails.values.length; i++){
                for(uint j = 0; j < fromUser[fromMails.values[i]].length; j++){
                    trxs[index] = fromUser[fromMails.values[i]][j];
                    index++;
                }
            }
        }
        Transactions memory ts = Transactions(trxs, index);
        return ts; 
    }
    function getToTransactionsIds(StringQuery memory toMails) private view returns(Transactions memory){
        uint index = 0;
        uint256[] memory trxs;

        if(compare(toMails.operator, eq) == 0){
            trxs = new uint256[](toUser[toMails.values[0]].length);
            for(uint i = 0; i < toUser[toMails.values[0]].length; i++){
                trxs[index] = toUser[toMails.values[0]][index];
                index++;

            }
            
        }else if(compare(toMails.operator, _in) == 0){
            uint size = 0;
            for(uint i = 0; i < toMails.values.length; i++){
                size = size + toUser[toMails.values[i]].length;
            }

            trxs = new uint256[](size);
            for(uint i = 0; i < toMails.values.length; i++){
                for(uint j = 0; j < toUser[toMails.values[i]].length; j++){
                    trxs[index] = toUser[toMails.values[i]][j];
                    index++;
                }
            }
        }
        Transactions memory ts = Transactions(trxs, index);
        return ts;
    }
    function getTxTypesTransactionsIds(IntQuery memory tTypes) private view returns(Transactions memory){
        uint index = 0;
        uint256[] memory trxs;

        if(compare(tTypes.operator, eq) == 0){
            trxs = new uint256[](types[tTypes.values[0]].length);
            for(uint i = 0; i < types[tTypes.values[0]].length; i++){
                trxs[index] = types[tTypes.values[0]][index];
                index++;

            }
            
        }else if(compare(tTypes.operator, _in) == 0){
            uint size = 0;
            for(uint i = 0; i < tTypes.values.length; i++){
                size = size + types[tTypes.values[i]].length;
            }

            trxs = new uint256[](size);
            for(uint i = 0; i < tTypes.values.length; i++){
                for(uint j = 0; j < types[tTypes.values[i]].length; j++){
                    trxs[index] = types[tTypes.values[i]][j];
                    index++;
                }
            }
        }
        Transactions memory ts = Transactions(trxs, index);
        return ts;
    }


    function searchTransactions(StringQuery memory from, StringQuery memory to, IntQuery memory txType, string memory operator) public view returns (ITransaction[] memory){

        uint index = 0;
        ITransaction[] memory trxs;


        Transactions memory f = getFromTransactionsIds(from);
        Transactions memory t = getToTransactionsIds(to);
        Transactions memory tp = getTxTypesTransactionsIds(txType);
        
        if(compare(operator,"OR") == 0){
        
            uint size = t.size + f.size + tp.size;
            trxs = new ITransaction[](size);

            for(uint i = 0; i < f.size; i++){
                trxs[index] = transactions[f.transactions[i]];
                index++;
            }
            for(uint i = 0; i < t.size; i++){
                trxs[index] = transactions[t.transactions[i]];
                index++;
            }
            for(uint i = 0; i < tp.size; i++){
                trxs[index] = transactions[tp.transactions[i]];
                index++;
            }


        }else{

            if(compare(from.field, "") != 0 && compare(to.field, "") != 0 && compare(txType.field, "") != 0){
   
                trxs = new ITransaction[](f.size);

                for(uint i = 0; i < f.size; i++){
                    for(uint j = 0; j < t.size; j++){
                        if(f.transactions[i] == t.transactions[j] && intIsIn(t.transactions[j], tp.transactions) == 0){
                            trxs[index] = transactions[f.transactions[i]];
                            index ++;
                        }
                    }
                }
            }else if(compare(from.field, "") != 0 && compare(to.field, "") != 0 && compare(txType.field, "") == 0){
  
                trxs = new ITransaction[](f.size);

                for(uint i = 0; i < f.size; i++){
                    if(intIsIn(f.transactions[i], t.transactions) == 0){
                        trxs[index] = transactions[f.transactions[i]];
                        index++;
                    }
                }
            }else if(compare(from.field, "") != 0 && compare(to.field, "") == 0 && compare(txType.field, "") != 0){
     
                trxs = new ITransaction[](f.size);

                for(uint i = 0; i < f.size; i++){
                    if(intIsIn(f.transactions[i], tp.transactions) == 0){
                        trxs[index] = transactions[f.transactions[i]];
                        index++;
                    }
                }

            }else if(compare(from.field, "") != 0 && compare(to.field, "") == 0 && compare(txType.field, "") == 0){
 
                trxs = new ITransaction[](f.size);
                for(uint i = 0; i < f.size; i++){
                    trxs[index] = transactions[f.transactions[i]];
                    index++;
                }

            }else if(compare(from.field, "") == 0 && compare(to.field, "") != 0 && compare(txType.field, "") != 0){

                trxs = new ITransaction[](t.size);

                for(uint i = 0; i < t.size; i++){
                    if(intIsIn(t.transactions[i], tp.transactions) == 0){
                        trxs[index] = transactions[f.transactions[i]];
                        index++;
                    }
                }

            }else if(compare(from.field, "") == 0 && compare(to.field, "") != 0 && compare(txType.field, "") == 0){

                trxs = new ITransaction[](t.size);
                for(uint i = 0; i < t.size; i++){
                    trxs[index] = transactions[t.transactions[i]];
                    index++;
                }

            }else if(compare(from.field, "") == 0 && compare(to.field, "") == 0 && compare(txType.field, "") != 0){

                trxs = new ITransaction[](tp.size);
                for(uint i = 0; i < tp.size; i++){
                    trxs[index] = transactions[tp.transactions[i]];
                    index++;
                }

            }

        }

        return trxs;
    }






    function stringIsIn(string memory value, string[] memory values) private pure returns(int256){
        for(uint i = 0; i < values.length; i++){
            if(compare(values[i], value) == 0){
                return 0;
            }
        }
        return 1;
    }

    function intIsIn(uint256 value, uint256[] memory values) private pure returns(int256){
        for(uint i = 0; i < values.length; i++){
            if(values[i] == value){
                return 0;
            }
        }
        return 1;
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
