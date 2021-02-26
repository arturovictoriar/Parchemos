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
    debug: true
});
/* allow middleware */
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use("/peerjs", peerServer);

/**
 * On a socket connection, make some actions
 */
io.on('connect', (socket) => {
    /**
     * On an addUser event, add a user in the user connected list
     */
    socket.on('addUser', ({ roomId, userId, username }, callback) => {
      // constanst
      const admin = "admin";
  
      // add the user in the user connected list
      const user = addUser({ id: userId, username, roomId });
  
      // create the meme room
      socket.join(user.room);
      // Send to all users, except the current one, the new list of users connected
      socket.broadcast.to(user.room).emit('usersList', { admin, users: getUsersInRoom(user.room) });
      // Send to the current user, the new list of user connected
      socket.emit('usersList', { admin, users: getUsersInRoom(user.room) });
      // Send to the current user, the historial messages
      socket.emit('updateMessages', { admin, messages });
    });
  
    /**
     * On a sendMessage event, broadcast the new message to all users,
     * expect the sender one
     */
    socket.on('sendMessage', (action, callback) => {
      // look for the current user
      const user = getUser(socket.id);
      // save the new message in the db
      messages.push({
        id: action.id,
        message: action.message,
        author: action.author,
        date: action.date
      });
      // Send to all users, except the current one, the new message
      socket.broadcast.to(user.room).emit('receiveMessage', action);
    });
  
    /**
     * On disconnect, remove the user from the list of users connected
     */
    socket.on('disconnect', () => {
      // constant
      const admin = "admin";
      // remove the user from the connected users list
      const user = removeUser(socket.id);
  
      if (user) {
        // update the users connected
        socket.broadcast.to(user.room).emit('usersList', { admin, users: getUsersInRoom(user.room) });
        if (user.name in allUsers) {
          // set the user as disconnected
          allUsers[user.name].connected = false;
        }
      }
    });
  
  });
  
  // start the server in a given port
  server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
