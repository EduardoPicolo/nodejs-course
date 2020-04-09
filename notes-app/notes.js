const fs = require('fs')

const getNotes = () => ("Your notes...")

const addNote = (title, body) => {
   const notes = loadNotes()
   // console.log(notes)

   notes.push({
      title,
      body
   })

   saveNotes(notes)
}

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch(e) {
      return []
   }
}

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
   getNotes,
   addNote,
}