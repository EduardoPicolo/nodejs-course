const chalk = require('chalk')
const yargs = require('yargs')
const validator = require('validator')
const notes = require('./notes')

// Create add command
yargs.command({
   command: 'add',
   describe: 'Add a new note',
   builder: {
      title: {
         describe: 'Note title',
         demandOption: true,
         type: 'string',
      },
      body: {
         describe: 'Note body',
         demandOption: true,
         type: 'string',
      },
   },
   handler(argv) {
      // console.log('Title: ' + argv.title)
      // console.log('Body: ' + argv.body)
      notes.addNote(argv.title, argv.body)
   }
})

// Create remove command
yargs.command({
   command: 'remove',
   describe: 'Remove a note',
   builder: {
      title: {
         describe: 'Note title',
         demandOption: true,
         type: 'string',
      }
   },
   handler(argv) {
      // console.log('Removing the note...')
      notes.removeNote(argv.title)
   }
})

// Create read command
yargs.command({
   command: 'read',
   describe: 'Read a note',
   handler(argv) {
      console.log('Reading the note...', argv)
   }
})

// Create list command
yargs.command({
   command: 'list',
   describe: 'List all notes',
   handler(argv) {
      notes.listNotes()
   }
})


// console.log(yargs.argv)
yargs.parse()