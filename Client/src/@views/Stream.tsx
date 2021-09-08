import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import history from '@App/history';
import videojs from 'video.js'
import Axios from 'axios';
import ServerConfig from '../../../Server/config';

/*
const Sream: React.FunctionComponent<{t:any, i18n:any, match:any}> = ({t, i18n, match}) =>{
    const [stream, setStream] = useState(false);
    const [videoJsOptions, setvideoJsOptions] : any = useState(null);
    let player : any = React.useRef(null);
    let videoNode : any = React.useRef(null);

    useEffect(() => {
        Axios.post('http://127.0.0.1:8000/streams/getStreamKey', {
            params: {
                username: match.params.username
            }
        }).then(res => {
            setStream(true);
            setvideoJsOptions({
                autoplay: false,
                controls: true,
                sources: [{
                    src: 'http://127.0.0.1:' + MediaServerConfig.rtmp_server.http.port + '/live/' + res.data.streamKey + '/index.m3u8',
                    type: 'application/x-mpegURL'
                }],
                fluid: true,
            })
            player = videojs(videoNode, videoJsOptions, function onPlayerReady() {
                console.log('onPlayerReady');
            });
        })
    }, []);
    return(
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
                {stream ? (
                    <div data-vjs-player>
                        <video ref={node => videoNode = node} className="video-js vjs-big-play-centered"/>
                    </div>
                ) : ' Loading ... '}
            </div>
        </div>
    )
};
*/
class Stream extends React.Component<any, any> {
    stream = false;
    videoJsOptions = null;
    player : any = null;
    videoNode : any = null;
    state = {
        stream: false,
        videoJsOptions: null
    }

    componentDidMount() {
        console.log(this.props);
        Axios.post('http://127.0.0.1:8000/streams/getStreamKey', {
            username: this.props.match.params.username
        }).then(res => {
            console.log(res);
            this.setState({
                stream: true,
                videoJsOptions: {
                    autoplay: true,
                    controls: true,
                    sources: [{
                        src: 'http://127.0.0.1:' + ServerConfig.Media_Server.http.port + '/live/' + res.data.streamKey + '/index.m3u8',
                        type: 'application/x-mpegURL'
                    }],
                    fluid: true,
                }
            }, () => {
                this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                    console.log('onPlayerReady')
                });
            });
        })
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
                    {this.state.stream ? (
                        <div data-vjs-player>
                            <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered"/>
                        </div>
                    ) : ' Loading ... '}
                </div>
            </div>
        )
    }
}

export default Stream;