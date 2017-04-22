"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const log = (err) => console.log(err);
const isFile = (f) => fs_1.statSync(f).isFile();
const readFolder = (folder) => new Promise((res, rej) => {
    fs_1.readdir(path_1.resolve(folder), (err, files) => {
        if (err)
            rej(err);
        const fileList = files.map(f => path_1.join(folder, f));
        res(fileList.filter(isFile));
    });
});
const read = (fName) => new Promise((res, rej) => {
    fs_1.readFile(path_1.resolve(fName), (err, str) => {
        if (err)
            rej(err);
        res(str);
    });
});
const concat = (files) => new Promise((res, rej) => {
    return Promise.all(files.map(read))
        .then(src => res(src.join('\n')))
        .catch(rej);
});
module.exports = (folder) => new Promise((res, rej) => {
    if (typeof folder === 'string') {
        readFolder(folder)
            .then(concat)
            .then(res)
            .catch(rej);
    }
    else {
        concat(folder)
            .then(res)
            .catch(rej);
    }
});
