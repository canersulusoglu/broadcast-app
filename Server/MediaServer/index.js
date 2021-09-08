const NodeMediaServer = require('node-media-server');
const MediaServerConfig = require('../config').Media_Server;
const ThumbnailGenerator = require('./cron/thumbnails');
const Databae = require('../database');
const Helper = require('../utils/Helper');

nms = new NodeMediaServer(MediaServerConfig);

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    Databae.Users.findOne({streamKey: stream_key}, (err, User) =>{
        if (!err) {
            if (!User) {
                let session = nms.getSession(id);
                session.reject();
            } else {
                console.log("test");
                Helper.generateStreamThumbnail(stream_key);
            }
        }
    })
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = () => {
    nms.run();
    ThumbnailGenerator.start();
};
