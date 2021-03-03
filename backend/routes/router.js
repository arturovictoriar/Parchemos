// Import libraries
const express = require("express");
const { v4: uuidv4 } = require('uuid');
// Import modules
const { checkNickPassword, createUser } = require('./validUsers');

// Create a router module
const router = express.Router();

/**
 * default URI, check if the server is up and running
 * @param {object} req request
 * @param {object} res response
 */
router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

/**
 * logIn URI, ask for permission to entry in the chat server
 * @param {object} req request
 * @param {object} res response
 */
router.post('/logIn', function (req, res) {
  const body = req.body;
  const permission = checkNickPassword(body.name, body.pw);
  // if the user exist in db and is already disconnected,
  // allow the permission to get in to chat server
  if (permission.ok) {
    return (res.send(permission).status(200));
  }
  // else, deny the permission to get in the chat server
  return (res.send(permission).status(401));
})

/**
 * signIn URI, create a new user if the nick does no exist
 * @param {object} req request
 * @param {object} res response
 */
router.post('/signIn', function (req, res) {
  const body = req.body;
  const permission = createUser(body.name, body.pw);
  // if the user doesnot exist in db, created the user
  if (permission.ok) {
    return (res.send(permission).status(201));
  }
  // else, do not create it
  return (res.send(permission).status(400));
})

/**
 * logIn URI, ask for permission to entry in the chat server
 * @param {object} req request
 * @param {object} res response
 */
router.get('/createRoomId', function (req, res) {
  const newRoom = {room: uuidv4()};
  // if the user exist in db and is already disconnected,
  // allow the permission to get in to chat server
  if (newRoom.room) {
    return (res.send(newRoom).status(200));
  }
  // else, deny the permission to get in the chat server
  return (res.send(newRoom).status(400));
})

// make the router module public
module.exports = router;
