pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;
contract Marketplace{

    struct IFromUser{
        uint userId;
        uint[] transactionIds;
    }

    struct IToUser{
        uint userId;
        uint[] transactionIds;
    }

    struct IType{
        uint typeId;
        uint[] transactionIds;
    }

    struct ITransaction{
        uint id;
        uint dbId;
        string from;
        string to;
        uint itemId;
        uint price;
        int txType;
        uint256 date;
    }


    mapping (uint => ITransaction) transactions;
    mapping (string => uint[]) fromUser;
    mapping (string => uint[]) toUser;
    mapping (int => uint[]) types;
    mapping (uint => uint) dbIds;
    uint count;

    event insertedTransaction(uint indexed id, uint indexed dbId);

    function addTransaction(uint dbId, string memory from, string memory to, uint itemId, uint price, int txType, uint256 date) public returns(uint){
        uint _id = count++;
        ITransaction memory trx = ITransaction(_id, dbId, from, to, itemId, price, txType, date); 
        transactions[_id] = trx;
        fromUser[trx.from].push(_id);
        toUser[trx.to].push(_id);
        types[trx.txType].push(_id);
        emit insertedTransaction(_id, dbId);
        return(_id);
    }
    

    function getAllTransactions() public view returns(ITransaction[] memory trxs){
        trxs = new ITransaction[](count);
        for(uint i = 0; i < count; i++){
            ITransaction memory trx = transactions[i];
            trxs[i] = trx;
        }
    }

    function getTransactionById(uint id) public view returns(ITransaction memory){
        return(transactions[id]);
    }

    function getTransactionsByDbIds(uint[] memory ids) public view returns(ITransaction[] memory){
        ITransaction[] memory trxs = new ITransaction[](ids.length);
        for(uint i = 0; i < trxs.length; i++){
            trxs[i] = transactions[dbIds[ids[i]]];
        }
        return trxs;
    }

    function query(string memory from, string memory to, int txType) public view returns(ITransaction[] memory){
        uint[] memory fromTransactions = fromUser[from];
        uint[] memory toTransactions = toUser[to];
        uint[] memory txTypes = types[txType];

        ITransaction[] memory trxs = new ITransaction[](fromTransactions.length + toTransactions.length + txTypes.length);
        if(compare(from, "") != 0){
            for(uint i = 0; i < fromTransactions.length; i++){
                trxs[fromTransactions[i]] = transactions[fromTransactions[i]];
            } 
        }
        if(compare(to, "") != 0){
            for(uint i = 0; i < toTransactions.length; i++){
                trxs[toTransactions[i]] = transactions[toTransactions[i]];
            } 
        }
        if(txType != -1){
            for(uint i = 0; i < txTypes.length; i++){
                trxs[txTypes[i]] = transactions[txTypes[i]];
            }
        } 
    return trxs;
    }
    

    function compare(string memory _a, string memory _b) private pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
}