const mongoose = require('mongoose');
const ApiServerConfig = require('../config').Api_Server;

const initializeDatabase = () =>{
    mongoose.connect(ApiServerConfig.MONGODB_URI ,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false});		
    mongoose.connection.on('open', function (ref) {
        console.log(`MongoDB is connected.`);
    }).on("error", (error) => console.log("Bağlantı oluşturulamadı.", error.message));
}

module.exports = {
    initializeDatabase: initializeDatabase,
    Users: require("./Models/Users")
}