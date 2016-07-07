var path = require('path');
var express = require('express');
var app = express();
var explore = require('./explore');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, 'client'))); // static files

app.get('/explore/scan', explore.scan);

app.listen(3000);

//
//var fs = require('fs');
//console.log(fs.readdirSync('..').map((file) => path.resolve('..', file)));