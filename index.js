var helpers = require('./lib/src/helpers');

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello PredictX');
});

// /mix?strings=[comma separated url encoded list of strings]
app.get('/mix', function(req, res){
    let strings = req.query.strings.split(',');
    console.log('strings', strings)
    res.json(helpers.getResponse(strings));
});

app.listen(3000);

console.log('Listening on 3000')