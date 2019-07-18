require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

app = express()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

const server = app.listen(3000)
global.io = require('socket.io')(server)

const dbService = require('./services/db')
const redisService = require('./services/redis')
const consumer = require('./services/queue/consumer')

const webappRouter = require('./routes/webapp')
const dataRouter = require('./routes/data')

dbService.testConnection()
redisService.testConnection()

app.use(bodyParser.json())


io.on('connection', function(socket){
    console.log('SOCKET.IO OK!')
})

app.get('/', (req, res) => {
    res.json({route: '/'})
})
/*
app.post('/data', (req, res, next) => {
    console.log('LOGGED ' + req.originalUrl)
    console.log('Altitude', req.body)
    if(req.body.altitude < 3000 || req.body.altitude > 10000) {
        
    }else{
        
    }
})
*/
app.use('/webapp', webappRouter)
app.use('/data', dataRouter)