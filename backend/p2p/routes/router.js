// Import libraries
const express = require("express");

// Create a router module
const router = express.Router();

/**
 * default URI, check if the server is up and running
 * @param {object} req request
 * @param {object} res response
 */
router.get("/", (req, res) => {
  res.send({ response: "Peer server is up and running." }).status(200);
});

// make the router module public
module.exports = router;
