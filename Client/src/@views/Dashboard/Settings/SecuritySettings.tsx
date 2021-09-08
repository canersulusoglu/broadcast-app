import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    InputGroup,
    FormControl,
    Divider,
    Message,
    Panel,
    IconButton
} from 'rsuite';

const SecuritySettings: React.FunctionComponent<{t:any, i18n:any}> = ({t, i18n}) =>{
    const User = useSelector((state : any) => state.Auth.User);

    return(
        <div>
            <Panel style={{marginBottom: 20}} header={<><h5 style={{marginTop: 20}}>İletişim</h5><p>Hesabınızla ilgili önemli mesajlar buraya gönderilir</p></>} bordered>
                <Grid>
                    <Row style={{maxWidth: 700}}>
                        <Col xs={24} sm={24} md={24}>
                            <Grid>
                                <Row>
                                    <Col xs={6}><h4>{User.email}</h4> </Col>
                                    <Col xs={18} xsPush={12} smPush={6} mdPush={6}>
                                        <IconButton icon={<i style={{marginLeft: -10}} className="fad fa-pen"/>}/>
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                        <Col xs={24} sm={24} md={24}>
                            {true ?
                            <Message
                                style={{marginTop: 30}}
                                showIcon
                                type="success"
                                description={
                                    <p>
                                        E-postanızı doğruladığınız için teşekkür ederiz!
                                    </p>
                                }
                            /> : 
                            <Message
                                style={{marginTop: 30}}
                                showIcon
                                type="warning"
                                description={
                                    <p>
                                        E-postanızı doğrulamanız gerekmektedir.
                                        <a href="#">Doğrula.</a>
                                    </p>
                                }
                            />
                            }
                        </Col>
                    </Row>
                </Grid>
            </Panel>

            <Panel style={{marginBottom: 20}} header={<><h5 style={{marginTop: 20}}>Güvenlik</h5><p>Hesabınızı güvende tutun</p></>} bordered>
                <Grid>
                    <Row style={{maxWidth: 700}}>
                        <Col xs={24} sm={24} md={24}>
                            <Grid>
                                <Row>
                                    <Col xs={12} sm={8} md={6}><h6>Parolayı Değiştir</h6> <span style={{fontSize: 12}}>Güçlü bir parola ile güvenliğinizi artırın.</span></Col>
                                    <Col xs={12} sm={16} md={12} xsPush={6} smPush={6} mdPush={3}>
                                        <IconButton appearance="primary" color="red" icon={<i style={{marginLeft: -10}} className="fad fa-key"/>} />
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                </Grid>
            </Panel>

            <Panel header={<><h5 style={{marginTop: 20}}>Gizlilik</h5></>} bordered>
                <Grid>
                    <Row style={{maxWidth: 700}}>
                        <Col xs={24} sm={24} md={24}>
                            <Grid>
                                <Row>
                                    <Col xs={12} sm={8} md={6}><h6>Parolayı Değiştir</h6> <span style={{fontSize: 12}}>Güçlü bir parola ile güvenliğinizi artırın.</span></Col>
                                    <Col xs={12} sm={16} md={12} xsPush={6} smPush={6} mdPush={3}>
                                        <IconButton appearance="primary" color="red" icon={<i style={{marginLeft: -10}} className="fad fa-key"/>} />
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                </Grid>
            </Panel>
        </div>
    )
};

export default SecuritySettings;