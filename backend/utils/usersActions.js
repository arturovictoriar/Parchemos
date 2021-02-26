// import modules
const users = require('./connectedUsers');

/**
 * Add a new user in the connected users list
 * @param {object} param0 user data
 */
const addUser = ({ id, username, room }) => {
  // create the new user object
  const user = { id, name: username, room };
  // add the new user in the list
  users.push(user);
  // return the new object user
  return (user);
}

/**
 * Remove a user from the connected users list
 * @param {string} id user sockect id
 */
const removeUser = (id) => {
  // look for the user to remove
  const index = users.findIndex((user) => user.id === id);
  // if the user was found the connected users list, remove it
  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

/**
 * Look for a given user
 * @param {string} id user socket id
 */
const getUser = (id) => users.find((user) => user.id === id);

/**
 * Look for all users from a given room
 * @param {string} room room chat
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// make the previous function public
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
