import {readFile, writeFile} from 'fs'
import {resolve} from 'path'

const write = (fName: string, str: string) => new Promise((res, rej) => {
  writeFile(resolve(fName), str, err => {
    if (err) return rej(err)
    
    return res(str)
  })
})

const read = (fName: string) => new Promise((res, rej) => {
  readFile(resolve(fName), (err, str) => {
    if (err) return rej(err)
    
    return res(str)
  })
})

export = (files: Array<string>, output?: string) => new Promise((res, rej) => {
  Promise.all(files.map(read)).
    then(input => {
      if (output) {
        write(output, input.join('\n')).then(res).catch(rej)
      } else {
        return res(input.join('\n'))
      }
    }).
    catch(rej)
})
