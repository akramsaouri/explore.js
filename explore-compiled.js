var fs = require('fs');
var path = require('path');

module.exports = {

    /**
     * Scan the current directory, fetch his sub dirs and resolve the path to each one of them
     */
    scan: function (req, res) {
        // navigate forward || back in the tree
        var cwd = req.query.dirname ? path.join(req.query.dirname, '..') : req.query.cwd;
        // get all files and resole their absolute path
        var files = fs.readdirSync(cwd).map(file => path.resolve(cwd, file));
        // get the dirname
        dirname = path.dirname(files[0]);
        // send the data to the front end
        res.send({ files, dirname });
    }
};

//# sourceMappingURL=explore-compiled.js.map