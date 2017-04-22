#!/usr/bin/env node

'use strict';

const app = require('commander')
const cfg = require('../package.json');
const concat = require('../index');
const path = require('path');
const { writeFile } = require('fs');

app.version(cfg.version)
  .option('-o, --output <file>', 'output file')
  .description(cfg.description)

app.parse(process.argv);

let err = (err: Error) => console.log(err);
let output = (o: string) => {
  if (!app.output) {
    console.log(o);
  } else {
		write(app.output, o)
			.catch(err);
	}
};

const write = (fName: string, str: string) => new Promise((res, rej) => {
  writeFile(path.resolve(fName), str, (err: Error) => {
    if (err) return rej(err)
    
    return res(str)
  })
});

if(app.args.length) {
  concat(app.args, app.output).then(output).catch(err)
} else throw new Error('no files specified')
