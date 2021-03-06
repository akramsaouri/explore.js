#!/usr/bin/env node
'use strict';

const path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    commander = require('commander'),
    package_json = require(path.join(__dirname, 'package.json')),
    open = require('open');

// command line utility
commander
    .version(package_json.version)
    .option('--port <port>', 'Port to listen to (3000 default one)', parseInt)
    .option('--browser <browser>', 'Favorite browser [chrome, firefox, iexplore,opera]')
    .parse(process.argv);

const port = commander.port || 3000,
    browser = commander.browser || 'chrome',

    explore = require('./explorer'); // explorer module

app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, 'client'))); // static files

app.get('/explore/scan', explore.scan);

app.get('/explore/unlink', explore.unlink);

app.get('/explore/search', explore.search);

app.post('/explore/rename', explore.rename);

app.listen(port, () => console.log(`starting app on ${port} port with ${browser} browser`)); //listen on the chosen port ( 3000 default one )

// serve file in the browser
//open(`http://localhost:${port}`, browser);