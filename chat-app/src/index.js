const app = require('./app')
require('./db/mongoose')
const { setupWebsocket } = require('./websocket')
const http = require('http')

const server = http.createServer(app)
setupWebsocket(server)

const port = process.env.PORT
server.listen(port, () => {
   console.log('Server is up on port ' + port)
})