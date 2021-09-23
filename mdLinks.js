const { isAbsolute } = require('path');
const path = require('path');
const { argv } = require('process');
const fsp = require("fs").promises;
const fs = require("fs");
const FileHound = require('filehound');

let savePath = process.argv[2];
savePath = path.resolve(savePath);
console.log('La ruta absoluta es: ', savePath);

const mdLinks = (path) => {
  isFile(savePath)
    .then(response=> {
      if(response === true){
        return isMd(path);
      }
    })
    .catch(console.log)
    .then(response => {
      console.log(response);
    });
}

const isFile = (path) => new Promise((resolve, reject) => {
  console.log(path);
  fs.stat(path, (error, stats) => {
    if(error){
      reject(error);
    }else{
      resolve(stats.isFile());
    }
  })
})

const isMd = (file) => path.extname(file) === '.md';

const readingFile = (paths) => {
  fsp.readFile(paths, 'utf-8')
    .then(function (result) {
      console.log("Leyendo el archivo " + result);
    })
    .catch(function (error) {
      console.log(error);
    })
}

const readingDir = (paths) => {
  const files = FileHound.create()
    .paths(paths)
    .ext('md')
    .find();

  files.then(console.log);
}


mdLinks();

module.exports = {
  mdLinks
}
