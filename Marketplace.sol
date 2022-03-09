pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;
contract Marketplace{

    struct Transaction{
        uint id;
        string from;
        string to;
        string price;
        string item;
        string transactionType;
    }


    mapping(uint => Transaction) transactions;
    uint id;

    function insertTransaction (
        string memory from,
        string memory to,
        string memory price,
        string memory item,
        string memory transactionType) public returns (uint _id){
        _id = id++;
        Transaction memory t = Transaction(_id, from, to, price, item, transactionType);
        transactions[_id] = t;
    }


    function getTransactionById(uint _id) public view returns (Transaction memory){
        Transaction memory t = transactions[_id];
        return (t);
    }

    function getAllTransactions() public view returns (Transaction[] memory){
        Transaction[] memory trxs = new Transaction[](id + 1);
        for(uint i = 0; i < id + 1; i++){
            Transaction memory t = transactions[i];
            trxs[i] = t;
        }
        return trxs;
    }

    function getAllTransactionsForUser(string memory user) public view returns (Transaction [] memory){
        Transaction[] memory trxs = new Transaction[](id + 1);
        for(uint i = 0; i < id + 1; i++){
            Transaction memory t = transactions[i];
            if(compare(user, t.from) == 0){
                trxs[i] = t;
            }
        }
        return trxs;
    }

    function getAllTransactionsByType(string memory trxType) public view returns (Transaction [] memory){
        Transaction[] memory trxs = new Transaction[](id + 1);
        for(uint i = 0; i < id + 1; i++){
            Transaction memory t = transactions[i];
            if(compare(trxType, t.transactionType) == 0){
                trxs[i] = t;
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
