/* Import libraries */
const express = require("express");
const cors = require("cors");
const http = require("http");
const { ExpressPeerServer } = require("peer");
const { port } = require('../config/peer.config');

/* Import modules */
const router = require('./routes/router');

/* Create instances */
const app = express();
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
/* allow middleware */
app.use(cors());
app.use(router);
app.use("/videochat", peerServer);

// start the server in a given port
server.listen(port, () => console.log(`Peer server has started on port ${port}.`));
