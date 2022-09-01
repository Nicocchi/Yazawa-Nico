/**
 * Logger class for easy and aesthetically pleasing console logging
 */

 const kleur = require("kleur");
 const moment = require("moment");
 
 
 exports.log = (content, type = "log") => {
   const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
   switch (type) {
     case "title": {
       return console.log(
         `${timestamp} ${kleur.black().bgCyan(type.toUpperCase())} ${content.toUpperCase()} `
       );
     }
     case "log": {
       return console.log(
         `${timestamp} ${kleur.bgBlue(type.toUpperCase())} ${content} `
       );
     }
     case "warn": {
       return console.log(
         `${timestamp} ${kleur.black().bgYellow(type.toUpperCase())} ${content} `
       );
     }
     case "error": {
       return console.log(
         `${timestamp} ${kleur.bgRed(type.toUpperCase())} ${content} `
       );
     }
     case "debug": {
       return console.log(
         `${timestamp} ${kleur.green(type.toUpperCase())} ${content} `
       );
     }
     case "cmd": {
       return console.log(
         `${timestamp} ${kleur.black().bgWhite(type.toUpperCase())} ${content}`
       );
     }
     case "ready": {
       return console.log(
         `${timestamp} ${kleur.black().bgGreen(type.toUpperCase())} ${content}`
       );
     }
     default:
       throw new TypeError(
         "Logger type must be either warn, debug, log, ready, cmd or error."
       );
   }
 };
 
 exports.error = (...args) => this.log(...args, "error");
 
 exports.warn = (...args) => this.log(...args, "warn");
 
 exports.debug = (...args) => this.log(...args, "debug");
 
 exports.cmd = (...args) => this.log(...args, "cmd");
 