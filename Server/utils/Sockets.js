const { readSockets } = require('./Helper');
const SocketIO = require("socket.io");

function initializeSockets(http, server){
    const IO = SocketIO(http, {
        cors: {
          origin: "*",
          credentials: true
        }
    });

    server.set('socket', IO);

    readSockets(IO, (sockets) =>{
        sockets.forEach(socket => {
            socket();
        });
    });
}

module.exports = initializeSockets;