#!/usr/bin/env node

const path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

    commander = require('commander'),
    package_json = require(path.join(__dirname, 'package.json'));

// command line utility
commander
    .version(package_json.version)
    .option('--port <port>', 'Port to listen to (3000 default one)', parseInt)
    .parse(process.argv);

const port = commander.port || 3000,

    explore = require('./explorer'); // explorer module

app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, 'client'))); // static files

app.get('/explore/scan', explore.scan);

app.get('/explore/unlink', explore.unlink);

app.post('/explore/rename', explore.rename);

app.listen(port); //listen on the chosen port ( 3000 default one )