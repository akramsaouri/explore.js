var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var explore = require('./explore');

app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, 'client'))); // static files

app.get('/explore/scan', explore.scan);

app.get('/explore/unlink',explore.unlink);

app.listen(3000);

//
//var fs = require('fs');
//console.log(fs.readdirSync('..').map((file) => path.resolve('..', file)));