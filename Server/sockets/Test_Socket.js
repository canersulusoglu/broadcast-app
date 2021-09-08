module.exports = function(io){
    io.on("connection", (socket) =>{
        socket.on("test", (data) =>{
            console.log(data.message);

            socket.emit("test",{
                message: "Bu server tarafından gönderilen bir test mesajıdır."
            })
        })
    });
}