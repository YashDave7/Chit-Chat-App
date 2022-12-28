// Node server which will handle socket io connections.

const { Server } = require("socket.io");

const io = new Server(8080);

// const { io } = require('socket.io')(8080);

const users = {};

io.on('connection',socket => {
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;
        console.log(users);
        socket.broadcast.emit('user-joined', name);
        // socket.emit('users-present', users);
    });

    // RECEIVED MESSAGE IS SENT TO OTHER USERS.
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // WHEN A USER DISCONNECTS.
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});

// io.listen(8080);