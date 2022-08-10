require ('dotenv/config');

//Dependencies
const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require('cors')

const Router = require ('./src/Routes/index');

const server = express ();
const port = process.env.PORT || 8088;
const nodeEnv = 'Development';

//Public Allow CORS
server.use (cors());

server.listen (port , () => {
    console.log (`http://localhost:${port}`);
});

server.use (logger ('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));

//Endpoint Router
server.use ('/api', Router);

module.exports = server;