const express = require("express");
const ApiServerConfig = require("./config").Api_Server;
const Http = require("http");
const SocketIO = require("socket.io");
const Middlewares = require('./utils/Middlewares');
const Routes = require('./utils/Routes');
const Sockets = require('./utils/Sockets');
const Database = require('./database');
const MediaServer = require("./MediaServer");
const path = require('path');

class Server{
    constructor(){
        this.server = express();
        this.http = Http.Server(this.server);
        this.Port = ApiServerConfig.port || 3000;
    }

    Setup(){
        new Middlewares(this.server);
        new Routes(this.server);
        new Sockets(this.http, this.server);
        Database.initializeDatabase();
    }

    Start(){
        this.Setup();
        this.http.listen(this.Port, () => {
            console.log(`App is listening on : ${this.Port}`);
            MediaServer();
        });
    }
}


const server = new Server();
server.Start();