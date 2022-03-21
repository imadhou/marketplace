# marketplace  
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

  GET api/transactions/ -> getAllTransactions()
  GET api/transactions/:id -> getAllTransactionsById(id) 
  POST api/transactions -> insertTransaction(transaction: Transaction)
  GET api/transactions/users/:user -> getAllTransactionsForUser(user: string)
  GET api/tranactions/types/:type -> getAllTransactionsByType(type: string)