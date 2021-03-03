/* Import libraries */
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const { port } = require('../config/socket.config');

/* Import modules */
const router = require('./routes/router');

/* Create instances */
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
/* allow middleware */
app.use(bodyParser.json());
app.use(cors());
app.use(router);

io.on('connect', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
    });

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

// start the server in a given port
server.listen(port, () => console.log(`Socket server has started on port ${port}.`));
