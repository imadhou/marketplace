const express = require('express');
var bodyParser = require('body-parser')
const app = express();

router = require('./router')


app.use(bodyParser.json());
app.use('/api',router)
const port = 3000;

const server = app.listen(port, () => {
    console.log("listening on port 3000");
});




