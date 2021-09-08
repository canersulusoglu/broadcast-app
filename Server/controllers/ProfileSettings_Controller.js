const Database = require('../database');
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const path = require("path");
const sharp = require('sharp');
const UploadFolder = String(process.env.UploadFolder);

class ProfileSettingsController{

    Update_ProfileImage(req, res){
        if(req.UserToken){
            var UserId = req.UserToken.user_id;
            var pictureFile = req.files.file;
            if(pictureFile){
                var uploadPath = path.join(UploadFolder, "Users", String(UserId), "profile-image.png");
                sharp(pictureFile.data)
                .resize(300, 300)
                .png()
                .toBuffer()
                .then(newAvatar => {
                    try {
                        fs.writeFileSync(uploadPath, newAvatar);
                        res.json({status: true, message:"Avatarını başarıyla değiştirdin."});
                    }catch (e) {
                        res.json({status: false, message: "File error!"});
                    }
                })
                .catch( err => {
                    res.json({status: false, message: "File error!"});
                });
            }else{
                res.json({status: false, message: "File error!"});
            }
        }else{
            res.json({status: false, message: "Token error!"});
        }
    }

    Update_BackgroundImage(req, res){
        if(req.UserToken){
            var UserId = req.UserToken.user_id;
            var pictureFile = req.files.file;
            if(pictureFile){
                var uploadPath = path.join(UploadFolder, "Users", String(UserId), "background-image.png");
                sharp(pictureFile.data)
                .resize(1200, 480)
                .png()
                .toBuffer()
                .then(newBackground => {
                    try {
                        fs.writeFileSync(uploadPath, newBackground);
                        res.json({status: true, message:"Arka plan resmini başarıyla değiştirdin."});
                    }catch (e) {
                        res.json({status: false, message: "File error!"});
                    }
                })
                .catch( err => {
                    res.json({status: false, message: "File error!"});
                });
            }else{
                res.json({status: false, message: "File error!"});
            }
        }else{
            res.json({status: false, message: "Token error!"});
        }
    }

    Remove_ProfileImage(req, res){
        if(req.UserToken){
            var UserId = req.UserToken.user_id;
            var uploadPath = path.join(UploadFolder, "Users", String(UserId), "profile-image.png");
            try {
                fs.unlinkSync(uploadPath);
                res.json({status: true, message:"Avatarını başarıyla sildin."});
            }catch (e) {
                console.log(e);
                res.json({status: false, message: "File error!"});
            }
        }else{
            res.json({status: false, message: "Token error!"});
        }
    }

    Remove_BackgroundImage(req, res){
        if(req.UserToken){
            var UserId = req.UserToken.user_id;
            var uploadPath = path.join(UploadFolder, "Users", String(UserId), "background-image.png");
            try {
                fs.unlinkSync(uploadPath);
                res.json({status: true, message:"Arka plan resmini başarıyla sildin."});
            }catch (e) {
                res.json({status: false, message: "File error!"});
            }
        }else{
            res.json({status: false, message: "Token error!"});
        }
    }

    ChangeThemeMode(req, res){
        if(req.UserToken){
            Database.Users.findByIdAndUpdate(req.UserToken.user_id, {"Preferences.theme": req.body.mode}, (err, doc)=>{
                if(err){
                    res.json({status: false, message: "Database Error!"});
                }
                
                if(doc){
                    res.json({status: true, message: "Theme mode changed."});
                }
                else{
                    res.json({status: false, message: "User not found."});
                }
            })
        }else{
            res.json({status: false, message: "Token error!"});
        }
    }

}

module.exports = ProfileSettingsController;