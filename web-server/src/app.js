const path = require('path')
const express = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

app.get('/weather', (req, res) => {
   res.send({
      location: 'Brasilia',
      temperature: 27,
   })
})

app.listen(3000, () => {
   console.log('Server is running on port 3000.')
})