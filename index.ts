import {readFile, readdir, statSync} from 'fs'
import {resolve, join} from 'path'

const log = (err: Error) => console.log(err);

const isFile = (f: string) => statSync(f).isFile();

const readFolder = (folder: string) => new Promise((res, rej) => {
  readdir(resolve(folder), (err, files) => {
    if (err) rej(err)
    
		const fileList = files.map(f => join(folder, f));
    res(fileList.filter(isFile));
  })
});


const read = (fName: string) => new Promise((res, rej) => {
  readFile(resolve(fName), (err, str) => {
    if (err) rej(err)
    
    res(str)
  })
});

const concat = (files: string[]) => new Promise((res, rej) => {
	return Promise.all(files.map(read))
		.then(src => res(src.join('\n')))
		.catch(rej);
});

export = (folder: string[] | string) => new Promise((res, rej) => {
	if(typeof folder === 'string') { 
		readFolder(folder)
			.then(concat)
			.then(res)
			.catch(rej);
	} else {
		concat(folder)
			.then(res)
			.catch(rej);
	}
});
