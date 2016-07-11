'use strict';

const fs = require('fs'),
    fsextra = require('fs-extra'),
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
        // fs-extra unlike fs module can remove
        // both files and dirs even if dirs have contents
        fsextra.remove(file, (err) => {
            // send the status
            const status = (err) ? 500 : 200;
            res.status(status).end();
        });
    },
    /**
     * Rename a file
     */
    rename(req, res){
        let _old = req.body.pk,
            _new = req.body.value;
        // get the root dirname
        const dirname = path.dirname(_old);
        // join the _new name file with it's path
        _new = path.join(dirname, _new);
        // rename it
        fs.rename(_old, _new, (err)=> {
            // send status code res
            const status = (err) ? 500 : 200;
            res.status(status).end();
        });
    },
    /** Search in path */
    search(req, res){
        const cwd = req.query.cwd || '.';
        let files = []; // will hold all the fetched files while walking through the tree
        fsextra.walk(cwd)
            .on('data', (file) => {
                // push file to files array
                files.push(file.path)
            })
            .on('end', () => {
                // send files to the client
                res.send(files);
            })
    }
};