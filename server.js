var http = require('http')
var express  = require('express')
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.get('/', function (req, res) {
    res.render('home')
})

var count = 0

io.on('connection', function(socket) {
    count++

    io.emit('news', {msg: 'One more person is online', count: count})
    socket.emit('private', function(data) {
        console.log(data)
    })

    socket.on('disconnection', function() {
        count--
        io.emit('news', {msg: 'Someone went home', count: count})
    })
})

server.listen(3000, function() {
    console.log('Listening on port 3000...')
})