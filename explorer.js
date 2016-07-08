const fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Scan the current directory, fetch his sub dirs and send them to the front
     */
    scan(req, res) {
        // navigate forward or back in the tree
        const cwd = (req.query.dirname) ? path.join(req.query.dirname, '..') : req.query.cwd;
        // get all files, resolve their absolute path and then parse them
        const files = fs.readdirSync(cwd)
            .map((file) => path.resolve(cwd, file))
            .map((file) => path.parse(file));
        // finally send the files to the front end
        res.send(files);
    },
    /**
     * Delete a file
     */
    unlink(req, res){ // todo : needs a res
        const file = req.query.file || '';
        // only delete if it's a file
        if (path.extname(file).length > 0) {
            fs.unlink(file);
        }
    }
};