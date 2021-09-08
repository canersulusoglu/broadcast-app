import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import history from '@App/history';
import Axios from 'axios';
import ServerConfig from '../../../Server/config';

const Home: React.FunctionComponent<{t:any, i18n:any}> = ({t, i18n}) =>{

    const [live_streams, setlive_streams] = useState([]);

    useEffect(() => {
        getLiveStreams();
    }, []);

    const getLiveStreams = () => {
        Axios.get('http://127.0.0.1:' + ServerConfig.Media_Server.http.port + '/api/streams')
            .then(res => {
                const streams = res.data;
                if (typeof (streams['live'] !== 'undefined')) {
                    getStreamsInfo(streams['live']);
                }
            });
    }

    const getStreamsInfo = (live_streams) => {
        Axios.get('http://127.0.0.1:8000/streams/info', {
            params: {
                streams: live_streams
            }
        }).then(res => {
            setlive_streams(res.data);
        });
    }

    return(
        <div className="home-container">
            {t('HomePage.header')}

            <Button onClick={() =>{ history.push('/') }}> Go To Home Page</Button>
            <Button onClick={() =>{ history.push('/auth/login') }}> Go To Login Page</Button>

            <h4>Live Streams</h4>
            <hr className="my-4"/>

            <div className="streams row">
                {
                    live_streams.map((stream :any, index) => {
                        return (
                            <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>
                                <span className="live-label">LIVE</span>
                                <Link to={'/stream/' + stream.username}>
                                    <div className="stream-thumbnail">
                                        <img src={'http://127.0.0.1:8000/thumbnails/' + stream.streamKey + '.png'}/>
                                    </div>
                                </Link>
                
                                <span className="username">
                                    <Link to={'/stream/' + stream.username}>
                                        {stream.username}
                                    </Link>
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
};

export default Home;