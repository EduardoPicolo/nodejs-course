const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
   const notes = loadNotes()

   const duplicateNote = notes.findIndex((note) => note.title === title)

   if (duplicateNote === -1) {
      notes.push({
         title,
         body
      })
      saveNotes(notes)
      console.log(chalk.green.bold('New note added!'))
   } else {
      console.log(chalk.yellow.bold('Note title already exists.'))
   }

}

const removeNote = (title) => {
   const notes = loadNotes()

   const noteToRemove = notes.findIndex((note) => (note.title === title))

   if (noteToRemove !== -1) {
      notes.splice(noteToRemove, 1)
      saveNotes(notes)
      console.log(chalk.red.bold('Removed ' + title))
   } else {
      console.log(chalk.yellow.bold('Note not found.'))
   }
}

const listNotes = () => {
   const notes = loadNotes()

   console.log(chalk.bold.blue.inverse('Your notes'))
   notes.forEach(note => console.log('- ' + chalk.yellow(note.title)))
}

const readNote = (title) => {
   const notes = loadNotes()

   const noteToRead = notes.find(note => note.title === title)

   if (noteToRead) {
      console.log('- ' + chalk.bold.yellow(noteToRead.title) + '\n' +
         chalk.inverse(noteToRead.body))
   } else {
      console.log(chalk.red.bold('Note not found.'))
   }
}

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch (e) {
      return []
   }
}

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
   addNote,
   removeNote,
   listNotes,
   readNote,
}