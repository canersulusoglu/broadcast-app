const express = require("express");
const path = require('path');
const fileUpload = require('express-fileupload');

function Middlewares(server){
	server.use('/views', express.static(path.join(__dirname, '../views')));
	server.use('/Uploads', express.static(path.join(__dirname, '../Uploads')));
	
	server.use('/thumbnails', express.static(path.join(__dirname, '../MediaServer/thumbnails')));

	server.use(fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	}));

	// Body Parser Middleware
	var bodyparser = require('body-parser');
	server.use(bodyparser.json({limit: '10mb', extended: true}))
	server.use(bodyparser.urlencoded({limit: '10mb', extended: true}))
}

module.exports = Middlewares;