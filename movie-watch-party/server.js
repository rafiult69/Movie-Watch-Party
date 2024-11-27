const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/movieChat', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User  disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});