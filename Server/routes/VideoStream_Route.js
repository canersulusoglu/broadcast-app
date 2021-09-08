const Express = require("express");
const router = Express.Router();
const { checkAuth } = require('../utils/Helper');

/**
 * Routing for VideoStreamController
 */
const VideoStreamController = require('../controllers/VideoStream_Controller');
const Controller = new VideoStreamController();

router.get("/info", (req, res)=> Controller.StreamsInfo(req, res));
router.post("/getStreamKey", (req, res)=> Controller.GetStreamKey(req, res));

module.exports = {
    Url: '/streams',
    Router: router
};
