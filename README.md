# Blockchain based marketplace  

Welcome to the blockchain-based marketplace project developed as part of my 1st year of master's degree. This project aims to create a secure and transparent platform for buying and selling goods and services online, using the power of blockchain technology.

The platform is designed to provide a seamless and efficient marketplace experience, while eliminating the need for intermediaries such as banks or other financial institutions. The decentralized platform enables buyers and sellers to interact directly, while the blockchain technology provides a secure and transparent record of all transactions.

The marketplace platform is user-friendly and accessible to everyone, and supports multiple payment options, including cryptocurrency. The platform is built using [Ethereum / Geth / Web3JS / Javascript / NodeJS]

Please feel free to explore the code and contribute to the project. If you have any questions or feedback, don't hesitate to reach out!


./geth --datadir C:\Users\toyoy\Documents\GitHub\marketplace\blockchainApi\bcData init C:\Users\toyoy\Documents\GitHub\marketplace\blockchainApi\bcData\706.json

## après avoir suivi les instructions ci-dessous lancer les deux commandes suivantes:  
- npm run deploy : pour deployer le smart contract
- npm start : pour lancer le serveur

## 1-1 installer geth:
En linux 'sudo apt-install ethereum'  
En windows 'voir le site de etheruem'  
### 1-2

création d'un répertoire pour les données:   
'mkdir bcData'  
'cd bcData'  
création d'un compte de minage:
'geth –datadir . account new'  
initialisation du block genesis:
exécuter la commande puppeth:
puppeth -> marketplace -> 2 -> 1 -> 1 -> "CLE DU COMPTE GENERE" -> entrer -> 706 -> 2 -> 2 -> entrer -> CTR+C ou CTR+D  
dans un fichier que vous nommez password.sec spécifiez le mot de passe que vous avez donné lors de la création du compte  
CTR+C / CTR+V de startnode.sh dans le répertoire que vous vensez de créer   
./startnode.sh pour lancer geth
vous pouvez aussi copier le contenu de startnode.sh et le coller dans le terminale pour lancer geth  


## 2- installer remix ide:
Il faut avoir docker installé sur vos machines  
'docker pull remixproject/remix-ide:latest'    
'docker run -p 8080:80 remixproject/remix-ide:latest'  
127.0.0.1:8080 pour ouvrir l'ide  
créer un nv fichier 'Marketplace.sol'  
coller le contenu du contrat qui se trouve dans la racine du projet    
compilez et deployer
copier l'adresse du contrat que vous avez deployer pour l'utiliser dans l'api  

## 3- API
executer les commandes suivantes  
1- 'git clone https://github.com/imadhou/marketplace.git'  
2- 'npm install'  
3- dans bc.js remplacer la valeur de la variable account par l'adresse de votre compte  
vouls allez le trouver dans /bcData/keystore  
4- remplacer l'adresse du contrat par l'adresse que vous avez copier lors du déploiment
3- 'node server.js'   

  une transaction est définie comme suit:
  Transaction{
      id: number,
      from: string,
      to: string,
      price: string,
      item: string,
      transactionType: string
  }   

  pour acceder à l'api : 127.0.0.1:3000  


- post('api/transactions' => addTransaction({dbId: 30, from: "a", to: "b", itemId: 5, price: 500, txType: 5}))
- get('api/transactions' => getAllTransactions());
- get('api/transactions/:id' => getTransactionById(5));
- post('api/transactions/dbIds'  =>  getTransactionsByDbIds([5,6,7]));
- post 'api/transactions/query'  => getTransactionsByquery({from: "a", to: "", txType: -1}));
