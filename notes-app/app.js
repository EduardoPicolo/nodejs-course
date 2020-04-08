const chalk = require('chalk')
const validator = require('validator')
const getNotes = require('./notes')

console.log(getNotes())

console.log(chalk.green.bold.inverse("Success!"));