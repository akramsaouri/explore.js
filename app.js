//var express = require('express');
//var app = express();
//
//app.get('/', function (req, res) {
//    res.send('Hello World')
//});
//
//app.listen(3000);
var explore = require('./explore');

explore.list('./', (file) => console.log('$j', file));

// list all directories
// tree
// remove / rename
// deplace [ optional ]
