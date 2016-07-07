var fs = require('fs');
var path = require('path');

module.exports = {
    /**
     * Scan the current directory, fetch his sub dirs and resolve the path to each one of them
     */
    scan: function (req, res) {
        var cwd = req.query.cwd || '.';
        var files = fs.readdirSync(cwd).map(file => path.resolve(cwd, file));
        res.send(files);
    }
};

//# sourceMappingURL=explore-compiled.js.map