const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const bc = require('./bc')
router = require('./router')


app.use(bodyParser.json());
app.use('/api',router)
const port = 3000;

app.listen(port, () => {
    console.log("listening on port 3000");
    bc.listenToInsertedEvents();
});




