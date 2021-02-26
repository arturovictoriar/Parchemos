// import modules
const users = require("./allUsers");

const USER_CREATED = "User created";
const USER_LOGGED = "User logged";
const USER_CONNECTED = "User already connected";
const USER_NOT_FOUND = "User not found in the service";
const USER_INCORRECT = "User nick name or user password incorrect"
const USER_EXIST = "User already exist";

/**
 * Check if the user and pw are availables to get it in the chat server
 * @param {string} nick 
 * @param {string} password 
 */
const checkNickPassword = (nick, password) => {
    /* if the not user exist in db, or the password is incorrect,
       and is already connected,
       deny the permission to get in the chat server
       */
    if (!(nick in users)) {
        return ({ message: USER_NOT_FOUND, ok: false });
    }
    else if (nick in users && users[nick].connected === true) {
        return ({ message: USER_CONNECTED, ok: false });
    }
    else if (nick in users && users[nick].pw !== password) {
        return ({ message: USER_INCORRECT, ok: false });
    }
    // else, allow the permission to get in to chat server
    else {
        users[nick].connected = false;
        return ({ message: USER_LOGGED, ok: true });
    }
}

/**
 * Create a new user if the nich is available in the db
 * @param {string} nick 
 * @param {string} password 
 */
const createUser = (nick, password) => {
    // if the user exists in db, Does not create the user
    if (nick in users) {
        return ({ message: USER_EXIST, ok: false });
    }
    // else, create the user
    users[nick] = { pw: password, connected: false };
    return ({ message: USER_CREATED, ok: true });
}

// make the previous function public
module.exports = { checkNickPassword, createUser };
