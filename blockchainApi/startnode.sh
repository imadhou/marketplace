geth --networkid 706 --mine --miner.threads 2 --datadir "bc" --nodiscover --ws --ws.port "8545" --http --http.port "8545" --port "30303" --graphql --http.corsdomain "*" --nat "any" --http.api eth,web3,personal,net --unlock 0 --allow-insecure-unlock --password bc/password.sec --ipcpath "~/.ethereum/geth.ipc" 
