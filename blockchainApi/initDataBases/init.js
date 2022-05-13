var fs = require('fs'); 
const { parse } = require('fast-csv');
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)


const loadDataFromCsv = () =>{
    return new Promise(function(resolve, reject){
        var users = [];
        var transactions = [];
        const fromRegex = new RegExp("(\'|\")([^@{(<\"\']+@[^@{(]+\.[^@{(]+)(\'|\")");
        var j = 0;
        var us = 0
        fs.createReadStream('/home/imadhou/dataset.csv')
        .pipe(parse({ignoreEmpty: true, delimiter: ',', maxRows: 900, headers: true}))
        .on('data', function(csvrow) {
            const from = csvrow.From.match(fromRegex);
            pseudo = csvrow["X-From"].split(',');    
            if(from && pseudo[0].length < 10){
                j++;
                const mail = users.find(u => u.email === from[2]);
                if(!mail){
                    us++
                    users.push({
                        id: us,
                        email: from[2],
                        password: "marketplace",
                        pseudo: pseudo[0]
                    })
                }
                if(!csvrow.To.includes("<") && !csvrow.To.match(new RegExp("([a-zA-Z0-9]+\'[a-zA-Z0-9]+)|(\'[\.]+\')"))){
                    var to = csvrow.To.slice(11, csvrow.To.length-2);
                    to = to.split("'").join("\"")
                    to = to.split("\"\"").join("\"")
                    to = `[${to}]`
                    to = JSON.parse(to);
                    if(to[0]){
                        transactions.push({
                            id: j,
                            from: from[2],
                            to: to[0],
                            txType: Math.round(Math.random() * (3 - 1)) + 1,
                            date: Math.round((new Date()).getTime()/1000),
                            itemId: j,
                            price: Math.round(Math.random() * (1500 - 5)) + 1
                        });
                    }
                }
            }
        })
        .on('end',function() {
            var jsonContent = JSON.stringify(users);
            fs.writeFile("./users.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            }); 

            jsonContent = JSON.stringify(transactions);
            fs.writeFile("./transactions.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log("data loaded");
            resolve();
        });
    })
    
}

exports.getUsersToInit = async () => {
    var users = await readFileAsync(__dirname+'/users.json');
    users = JSON.parse(users);
    return users
}

exports.getTransactionsToInit = async()=>{
    var trxs = await readFileAsync(__dirname+'/transactions.json');
    trxs = JSON.parse(trxs);
    return trxs;
}
