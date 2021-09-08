const Express = require("express");
const router = Express.Router();
const { checkAuth } = require('../utils/Helper');

/**
 * Routing for AuthController
 */
const AuthController = require('../controllers/Auth_Controller');
const Controller = new AuthController();

router.post("/login", (req, res)=> Controller.Login(req, res));
router.post("/register", (req, res)=> Controller.Register(req, res));
router.post("/get_user", checkAuth, (req, res)=> Controller.GetUser(req, res));

module.exports = {
    Url: '/auth',
    Router: router
};
