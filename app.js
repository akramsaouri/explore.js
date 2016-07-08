#!/usr/bin/env node

const path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const explore = require('./explorer');

app.use(bodyParser.json()); // body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.join(__dirname, 'client'))); // static files

app.get('/explore/scan', explore.scan);

app.get('/explore/unlink', explore.unlink);

app.listen(3000);