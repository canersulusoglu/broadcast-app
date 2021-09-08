const Express = require("express");
const router = Express.Router();
const { checkAuth } = require('../utils/Helper');

/**
 * Routing for ProfileSettings_Controller
 */
const ProfileSettings_Controller = require('../controllers/ProfileSettings_Controller');
const Controller = new ProfileSettings_Controller();

router.post("/upload_profile_image", checkAuth, (req, res)=> Controller.Update_ProfileImage(req, res));
router.post("/upload_background_image", checkAuth, (req, res)=> Controller.Update_BackgroundImage(req, res));
router.delete("/remove_profile_image", checkAuth, (req, res)=> Controller.Remove_ProfileImage(req, res));
router.delete("/remove_background_image", checkAuth, (req, res)=> Controller.Remove_BackgroundImage(req, res));
router.post("/change_theme_mode", checkAuth, (req, res)=> Controller.ChangeThemeMode(req, res));

module.exports = {
    Url: '/update_profile',
    Router: router
};
