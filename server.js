const express = require('express');
const server = express();
const superheroRouter = require('./api/superhereRouter')

server.use(express.json());
server.use('/api/heros', superheroRouter)

module.exports = server;