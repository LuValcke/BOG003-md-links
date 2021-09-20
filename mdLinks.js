const { isAbsolute } = require('path');
const path = require('path');
const { argv } = require('process');
const fs = require("fs");
const FileHound = require('filehound');

// print process.argv
let savePath = '';
let convertedPath = '';
//Función que recibe el parámetro de ruta
const userPath = () => {
  savePath = process.argv[2];
  console.log(`Esta es la dirección entregada por el usuario: `, savePath);
};
userPath();
//Función que reconoce si la ruta es absoluta o no
const absolutePath = () => {
  if (isAbsolute(savePath) === true) {
    convertedPath = savePath;
    console.log('isAbslute');
  } else {
    convertedPath = path.resolve(savePath);
    console.log(`Esta es la dirección convertida: ` , convertedPath);
  }
  return convertedPath;
}
absolutePath();
//FUnción que lee el archivo de la ruta y saca los links
const readingFIle = () => {
  fs.promises.readFile(convertedPath, 'utf-8')
    .then(function (result) {
      console.log("Leyendo el archivo " + result);
    })
    .catch(function (error) {
      console.log(error);
    })
}
//Función para leer directorio con librería FileHound
const readingDir = () => {
  const files = FileHound.create()
    .paths(convertedPath)
    .ext('md')
    .find();

  files.then(console.log);
}
//Función que determina si la ruta es de un archivo o un directorio
fs.lstat(convertedPath, (err, stats) => {
  if (err) {
    return console.log(err); //Handle error
  }else if (stats.isFile()){
    console.log(`Es un archivo`);
    readingFIle();
  }else{
    console.log(`Es un directorio`);
    readingDir();
  }
});
/* CREAR FUNCIÓN MD LINKS QUE SEA LA CONTENEDORA DE TODOS LOS PASOS, USAR FS.LSTATS CON PROMISES, SE PUEDE REUTILIZAR LA FUNCIÓN READINGFILE PARA LA LECTURA DE 
CADA UNO DE LOS ARCHIVOS DEL DIRECTORIO */
