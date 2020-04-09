const chalk = require('chalk')
const yargs = require('yargs')
const validator = require('validator')
const getNotes = require('./notes')

const command = process.argv[2]

if (command === 'add') {
   console.log('Adding note!')
} else if (command === 'remove') {
   console.log('Removing note!')
}