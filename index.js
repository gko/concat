"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const write = (fName, str) => new Promise((res, rej) => {
    fs_1.writeFile(path_1.resolve(fName), str, err => {
        if (err)
            return rej(err);
        return res(str);
    });
});
const read = (fName) => new Promise((res, rej) => {
    fs_1.readFile(path_1.resolve(fName), (err, str) => {
        if (err)
            return rej(err);
        return res(str);
    });
});
module.exports = (files, output) => new Promise((res, rej) => {
    Promise.all(files.map(read)).
        then(input => {
        if (output) {
            write(output, input.join('\n')).then(res).catch(rej);
        }
        else {
            return res(input.join('\n'));
        }
    }).
        catch(rej);
});
