const express = require('express');
const http = require('http')
const path = require('path');
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({id: socket.id, ...options})
        if(error) {
            return callback(error)
        }

        socket.join(user.room);
        socket.emit('message', generateMessage('Admin', 'Welcome!')); //sends to everyone
        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined!`)) //sends to others
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()

    })

    socket.on('sendMessage', (message, callback) => { //catch event
        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity not allowed')
        }
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })            
        }
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })
})

// let count = 0

// io.on('connection', (socket) => {
//     console.log("New WebSocket Connection")
//     socket.emit('countUpdated', count);

//     socket.on('increment', () => {
//         count++
//         //socket.emit('countUpdated', count)
//         io.emit('countUpdated',count)
//     })
// })

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})