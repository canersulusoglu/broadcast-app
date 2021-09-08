const Express = require("express");
const router = Express.Router();

/**
 * Routing for ApiController
 */
const ApiController = require('../controllers/Api_Controller');
const Controller = new ApiController();


module.exports = {
    Url: '/api',
    Router: router
};
