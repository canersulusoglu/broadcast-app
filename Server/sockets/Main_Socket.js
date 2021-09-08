module.exports = function(io){
    io.on("connection", (socket) =>{
        console.log(`${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı.`);

        socket.on("disconnect", () => {
            console.log(`${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı.`);
        });
    });
}