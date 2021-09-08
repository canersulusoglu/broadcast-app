const ApiServerConfig = require('../config').Api_Server;
const Database = require('../database');
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const path = require("path");
const shortid = require('shortid');

class AuthController{

    Login(req, res){
        Database.Users.findOne({
            $or:[
                { 'username': req.body.username_or_email },
                { 'email': req.body.username_or_email }
            ],
            'password': md5(req.body.password)
        }, (err, doc)=>{
            if(err){
                res.json({status: false, message: "Database Error!"});
            }

            if(doc){
                jwt.sign({'user_id': doc._id }, ApiServerConfig.JwtSecret, (err, token)=>{
                    if(err){
                        res.json({status: false, message: "Token Error!"});
                    }
                    res.json({status: true, message: "Successfully logged.", token: token});
                });

            }else{
                res.json({status: false, message: "Username/E-mail or password wrong."});
            }
        })
    }

    Register(req, res){
        Database.Users.find({ 
            $or:[
                { 'username': req.body.username },
                { 'email': req.body.email }
            ]
        }, (err, docs) =>{
            if(err){
                res.json({status: false, message: "Database Error!"});
            }

            if(docs.length == 0){
                Database.Users.create({
                    'username': req.body.username,
                    'displayName': String(String(req.body.username)[0].toUpperCase() + String(req.body.username).slice(1)),
                    'email': req.body.email,
                    'password': md5(req.body.password),
                    'streamKey': shortid.generate()
                }, (err, doc) =>{
                    if(err){
                        res.json({status: false, message: "Database Error!"});
                    }

                    var channelDir = `./Uploads/Users/${doc._id}`;
                    if(!fs.existsSync(channelDir)){
                        fs.mkdirSync(channelDir, (err) =>{
                            if(err){
                                res.json({status: false, message: "Error!."});
                            }else{
                                res.json({status: true, message: "Successfully registered."});
                            }
                        });
                    }
                })
            }else{
                res.json({status: false, message: "This username or email is used by somebody else."});
            }
        })
    }

    GetUser(req, res){
        if(req.UserToken){
            Database.Users.findOne({
                '_id': req.UserToken.user_id
            }, (err, doc)=>{
                if(err){
                    res.json({status: false, message: "Database Error!"});
                }
                
                if(doc){
                    res.json({status: true, User: doc});
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

module.exports = AuthController;