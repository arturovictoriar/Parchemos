/* Import libraries */
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const { ExpressPeerServer } = require("peer");

/* Import modules */
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/usersActions');
const allUsers = require('./routes/allUsers');
const router = require('./routes/router');
const messages = require('./utils/storedMessages');
const { use } = require("./routes/router");

/* Create instances */
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const peerServer = ExpressPeerServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
/* allow middleware */
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use("/videochat", peerServer);

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId)
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
  server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
