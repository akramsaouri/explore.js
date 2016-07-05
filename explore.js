var fs = require('fs');

module.exports = {
    list: function (path, cb) { // todo : promises
        var files = fs.readdirSync(path);
        cb(files);
    }
};