const fs = require("fs");
const Database = require('../database');

class VideoStreamController{

    StreamsInfo(req, res){
        if(req.query.streams){
            let streams = JSON.parse(req.query.streams);
            let query = {$or: []};
            for (let stream in streams) {
                if (!streams.hasOwnProperty(stream)) continue;
                query.$or.push({streamKey : stream});
            }

            Database.Users.find(query,(err, users) => {
                if (err)
                    return;
                if (users) {
                    res.json(users);
                }
            });
        }
    }

    GetStreamKey(req, res){
        if(req.body.username){
            Database.Users.findOne({
                username : req.body.username
            },(err, user) => {
                if (err)
                    return;
                if (user) {
                    res.json({
                        streamKey : user.streamKey
                    });
                }
            });
        }else{
            res.json({});
        }
    }

}

module.exports = VideoStreamController;