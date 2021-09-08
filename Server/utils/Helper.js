const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const spawn = require('child_process').spawn;
const ServerConfigs = require('../config');

function readRoutes(callback){
	const imports = []
    imports.push

	const Path = path.join(__dirname, '../routes/');
	fs
	.readdirSync(Path)
	.filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
	.map((file) => { imports.push(require(path.join(Path, file))) });

	callback(imports);
}

function readSockets(IO, callback){
	const imports = []

	const Path = path.join(__dirname, '../sockets');
	fs
	.readdirSync(Path)
	.filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
	.map((file) => { imports[file.slice(0, -3)] = require(path.join(Path, file))(IO)});

	callback(imports);
}

const checkAuth = (req, res, next) => {
	try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
		const Token = req.headers.authorization.split(" ")[1];
		jwt.verify(Token, ServerConfigs.Api_Server.JwtSecret, (err, decodedToken) =>{
			if(err){
				return res.status(401).send({
					message: 'Auth failed'
				});
			}else{
				req.UserToken = decodedToken;
			}
		});
		next();
    }catch(error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}

const generateStreamThumbnail = (stream_key) => {
    const args = [
        '-y',
        '-i', 'http://127.0.0.1:'+ServerConfigs.Media_Server.http.port+'/live/'+stream_key+'/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        'MediaServer/thumbnails/'+stream_key+'.png',
    ];

    spawn(ServerConfigs.Media_Server.trans.ffmpeg, args, {
        detached: true,
        stdio: 'ignore'
    }).unref();
};


module.exports = {
    readRoutes,
    readSockets,
	checkAuth,
	generateStreamThumbnail : generateStreamThumbnail
}