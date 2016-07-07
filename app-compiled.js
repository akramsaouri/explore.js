var path = require('path');
var express = require('express');
var app = express();
var explore = require('./explore');

app.use('/', express.static(path.join(__dirname, 'client')));

app.get('/explore', function (req, res) {
    var path = req.params.path || '.';
    explore.list(path, function (files) {
        res.send(files);
    });
});

app.listen(3000);

//# sourceMappingURL=app-compiled.js.map