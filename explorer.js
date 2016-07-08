'use strict';

const fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Scan the current directory, fetch his sub dirs and parse each one of them
     */
    scan(req, res, next) {
        // navigate forward or back in the tree
        const cwd = (req.query.dirname) ? path.join(req.query.dirname, '..') : req.query.cwd;
        if (path.extname(cwd).length > 0) { // do nothing if cwd is a file
            return next();
        }
        // if cwd is a dir then get all sub files, resolve their absolute path and then parse them
        const files = fs.readdirSync(cwd)
            .map((file) => path.resolve(cwd, file))
            .map((file) => path.parse(file));
        // finally send the files to the front end
        res.send(files);
        res.status(200).end();
    },
    /**
     * Delete a file
     */
    unlink(req, res){
        const file = req.query.file || '';
        // only delete if it's a file
        if (path.extname(file).length > 0) {
            fs.unlink(file, (err)=> {
                // send status code res
                const status = (err) ? 500 : 200;
                res.status(status).end();
            });
        }
    },
    /**
     * Rename a file
     */
    rename(req, res){ // todo : needs res
        let _old = req.body.pk,
            _new = req.body.value;
        // get the root dirname
        const dirname = path.dirname(_old);
        // join the _new name file with it's path
        _new = path.join(dirname, _new);
        // rename it
        fs.rename(_old, _new, ()=> {
            // send status code res
            const status = (err) ? 500 : 200;
            res.status(status).end();
        });
    }
};