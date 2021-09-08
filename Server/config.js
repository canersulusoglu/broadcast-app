const config = {
    Api_Server: {
        port : 8000,
        MONGODB_URI: "YOUR_MONGODB_URI",
        JwtSecret: "secret",
        ImagesServerUrl: "http://localhost:8000/",
        UploadFolder: "Uploads"
    },
    Media_Server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './MediaServer/media',
            allow_origin: '*'
        },
        trans: {
            // ffmpeg: '/usr/bin/ffmpeg', // for linux
            ffmpeg: 'C:/ffmpeg/bin/ffmpeg.exe', // for windows
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};

module.exports = config;
