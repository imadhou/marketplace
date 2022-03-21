pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract Marketplace {
    struct ITransaction {
        uint256 id;
        uint256 dbId;
        string from;
        string to;
        uint256 itemId;
        uint256 price;
        int256 txType;
        uint256 date;
    }

    mapping(uint256 => ITransaction) transactions;
    mapping(string => uint256[]) fromUser;
    mapping(string => uint256[]) toUser;
    mapping(int256 => uint256[]) types;
    mapping(uint256 => uint256) dbIds;
    uint256 count;

    event insertedTransaction(uint256 indexed id, uint256 indexed dbId);

    function addTransaction(
        uint256 dbId,
        string memory from,
        string memory to,
        uint256 itemId,
        uint256 price,
        int256 txType,
        uint256 date
    ) public returns (uint256) {
        uint256 _id = count++;
        ITransaction memory trx = ITransaction(
            _id,
            dbId,
            from,
            to,
            itemId,
            price,
            txType,
            date
        );
        transactions[_id] = trx;
        fromUser[trx.from].push(_id);
        toUser[trx.to].push(_id);
        types[trx.txType].push(_id);
        emit insertedTransaction(_id, dbId);
        return (_id);
    }

    function getAllTransactions()
        public
        view
        returns (ITransaction[] memory trxs)
    {
        trxs = new ITransaction[](count);
        for (uint256 i = 0; i < count; i++) {
            ITransaction memory trx = transactions[i];
            trxs[i] = trx;
        }
    }

    function getTransactionById(uint256 id)
        public
        view
        returns (ITransaction memory)
    {
        return (transactions[id]);
    }

    function getTransactionsByDbIds(uint256[] memory ids)
        public
        view
        returns (ITransaction[] memory)
    {
        ITransaction[] memory trxs = new ITransaction[](ids.length);
        for (uint256 i = 0; i < trxs.length; i++) {
            trxs[i] = transactions[dbIds[ids[i]]];
        }
        return trxs;
    }

    function query(
        string memory from,
        string memory to,
        int256 txType
    ) public view returns (ITransaction[] memory) {
        uint256[] memory fromTransactions = fromUser[from];
        uint256[] memory toTransactions = toUser[to];
        uint256[] memory txTypes = types[txType];

        ITransaction[] memory trxs = new ITransaction[](
            fromTransactions.length + toTransactions.length + txTypes.length
        );
        if (compare(from, "") != 0) {
            for (uint256 i = 0; i < fromTransactions.length; i++) {
                trxs[fromTransactions[i]] = transactions[fromTransactions[i]];
            }
        }
        if (compare(to, "") != 0) {
            for (uint256 i = 0; i < toTransactions.length; i++) {
                trxs[toTransactions[i]] = transactions[toTransactions[i]];
            }
        }
        if (txType != -1) {
            for (uint256 i = 0; i < txTypes.length; i++) {
                trxs[txTypes[i]] = transactions[txTypes[i]];
            }
        }
        return trxs;
    }

    function compare(string memory _a, string memory _b)
        private
        pure
        returns (int256)
    {
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
