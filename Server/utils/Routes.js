const express = require("express");
const path = require('path');
const { readRoutes } = require('../utils/Helper');
const ApiRoute = require('../routes/Api_Route');

function LoadRoutes(server){
    readRoutes((routes) => {
        server.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });

        routes.forEach(route => {
            server.use(route.Url, route.Router);
        });
    })

    // Static Page
	server.get(/.*/, (req, res) =>{
        res.sendFile(path.join(__dirname, "../views/index.html"));
	})

    /*
    // Page Not Found Page
    this.app.get('*', function(req, res) {
        res.render('Errors/404',{layout: false});
    });
    */
}

module.exports = LoadRoutes;