var fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Scan the current directory, fetch his sub dirs and resolve the path to each one of them
     */
    scan(req, res) {
        // navigate forward or back in the tree
        var cwd = (req.query.dirname) ? path.join(req.query.dirname, '..') : req.query.cwd;
        // get all files and resolve their absolute path
        var files = fs.readdirSync(cwd).map((file) => path.resolve(cwd, file));
        // get the dirname
        dirname = path.dirname(files[0]);
        // finally send the data to the front end
        res.send({files, dirname});
    },
    /**
     * Delete a file
     * @param req
     * @param res
     */
    unlink(req, res){
        var file = req.query.file || '';
        // only delete if it's a file
        if (path.extname(file).length > 0) {
            fs.unlink(file);
        }
    }
};
