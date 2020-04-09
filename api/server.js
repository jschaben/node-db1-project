const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRouter = require("../acounts/accountsRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "server running"});
});

module.exports = server;
