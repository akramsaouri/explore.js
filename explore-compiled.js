var fs = require('fs');

module.exports = {
    list: function (path, cb) {
        // todo : switch to promises
        var files = fs.readdirSync(path);
        cb(files);
    }
};

//# sourceMappingURL=explore-compiled.js.map