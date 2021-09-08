import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '@App/@store/actions';
import { FileType } from 'rsuite/lib/Uploader';
import { 
    IconButton, 
    Divider, 
    Uploader, 
    Loader, 
    Alert, 
    Col, 
    Row, 
    Grid,
    InputGroup, 
    Form, 
    FormGroup, 
    FormControl, 
    ControlLabel, 
    Schema,
    Modal,
    Button,
    Whisper,
    Popover,
    Panel,
} from 'rsuite';
import defaultProfileImage from '@App/@assets/images/default-profile-image.png';
import defaultBackgroundImage from '@App/@assets/images/default-background-pattern.png';
import AuthService from '@App/@services/AuthService';

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
}

function bytesToMegaBytes(bytes: number) { 
    return bytes / (1024*1024); 
}

const speakerProfileImageUploader = (
    <Popover title="Change Profile Image">
      <p>Click and select file. </p>
    </Popover>
);

const speakerBackgroundImageUploader = (
    <Popover title="Change Background Image">
      <p>Click and select file. </p>
    </Popover>
);

const ProfileImageUploader = (props : any) =>{
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(undefined);
    const User = useSelector((state : any) => state.Auth.User);
    return(
        <Whisper placement="auto" trigger="hover" speaker={speakerProfileImageUploader}>
            <Uploader
                {...props}
                headers={{
                    "Authorization": AuthService.getAuthorizationToken()
                }}
                fileListVisible={false}
                listType="picture"
                action="http://localhost:8000/update_profile/upload_profile_image"
                onUpload={(file: FileType) => {
                    const imageSize = bytesToMegaBytes(file.blobFile?.size || 0);
                    if(imageSize <= 10){
                        setUploading(true);
                    }else{
                        setUploading(false);
                        Alert.error('Resim maksimum 10 MB olmalıdır.');
                    }
                    setUploading(true);
                }}
                onSuccess={(response: any, file: FileType) => {
                    if(response.status){
                        setUploading(false);
                        Alert.success(response.message);
                        if(User.ProfileImage){
                            dispatch(Actions.updateUserData({ProfileImage: User.ProfileImage + `?${Date.now()}`}));
                        }else{
                            dispatch(Actions.updateUserData({ProfileImage: `http://localhost:8000/Uploads/Users/${User._id}/profile-image.png` + `?${Date.now()}`}));
                        }
                    }else{
                        Alert.error(response.message);
                    }
                }}
                onError={() => {
                    setFileInfo(undefined);
                    setUploading(false);
                    Alert.error('Upload failed');
                }}
                >
                <button style={{height: 200, width: 200, borderRadius: "5px"}}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (<img src={fileInfo} width="100%" height="100%" />) : 
                        (User.ProfileImage) ? (<img style={{width: "100%", height: "100%"}} src={User.ProfileImage} />)
                        :
                        (<img style={{width: "100%", height: "100%"}} src={defaultProfileImage} />)
                    }
                </button>
            </Uploader>
        </Whisper>
    )
}

const BackgroundImageUploader = (props : any) =>{
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(undefined);
    const User = useSelector((state : any) => state.Auth.User);
    return(
        <Whisper placement="auto" trigger="hover" speaker={speakerBackgroundImageUploader}>
            <Uploader
                {...props}
                headers={{
                    "Authorization": AuthService.getAuthorizationToken()
                }}
                fileListVisible={false}
                listType="picture"
                action="http://localhost:8000/update_profile/upload_background_image"
                onUpload={(file : FileType) => {
                    const imageSize = bytesToMegaBytes(file.blobFile?.size || 0);
                    if(imageSize <= 10){
                        setUploading(true);
                    }else{
                        setUploading(false);
                        Alert.error('Resim maksimum 10 MB olmalıdır.');
                    }
                }}
                onSuccess={(response: any, file: FileType) => {
                    if(response.status){
                        setUploading(false);
                        Alert.success(response.message);
                        if(User.BackgroundImage){
                            dispatch(Actions.updateUserData({BackgroundImage: User.BackgroundImage + `?${Date.now()}`}));
                        }else{
                            dispatch(Actions.updateUserData({BackgroundImage: `http://localhost:8000/Uploads/Users/${User._id}/background-image.png` + `?${Date.now()}`}));
                        }
                    }else{
                        Alert.error(response.message);
                    }
                }}
                onError={() => {
                    setFileInfo(undefined);
                    setUploading(false);
                    Alert.error('Upload failed');
                }}
                >
                <button style={{width: 500, height: 200, borderRadius: "10px"}}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (<img src={fileInfo} width="100%" height="100%" />) : 
                        (User.BackgroundImage) ? (<img style={{width: "100%", height: "100%"}} src={User.BackgroundImage} />)
                        :
                        (<span style={{backgroundRepeat: 'repeat', backgroundImage: `url(${defaultBackgroundImage})`, backgroundSize: 'contain', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}/>)
                    }
                </button>
            </Uploader>
        </Whisper>
    )
}

const FormModel = Schema.Model({
    displayName: Schema.Types.StringType().isRequired('This field is required.'),
    biography: Schema.Types.StringType()
});

const usernameChangeModel = Schema.Model({
    username: Schema.Types.StringType().isRequired('This field is required.')
});

const ProfileSettings: React.FunctionComponent<{t:any, i18n:any}> = ({t, i18n}) =>{
    const dispatch = useDispatch();
    const User = useSelector((state : any) => state.Auth.User);

    const [openUsernameFormModal, setOpenUsernameFormModal] = useState(false);
    const [saveUsernamChangeDisabled, setUsernameChangeDisabled] = useState(true);
    const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);


    const DeleteProfileImage = () =>{
        dispatch(Actions.removeProfileImage());
    }

    const DeleteBackgroundImage = () =>{
        dispatch(Actions.removeBackgroundImage());
    }

    const saveChanges = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(checkStatus){
            const formData : any = event.target;
            console.log(formData.displayName.value);
            console.log(formData.biography.value);
            /*
            dispatch(
                Actions.submitFormLogin(
                    {
                        username_or_email: formData.username_or_email.value,
                        password: formData.password.value
                    }
                )
            )
            */
        }
    }

    const checkForm = (formError: any) : void => {
        if(Object.keys(formError).length > 0){
            setSaveChangesDisabled(true);
        }else{
            setSaveChangesDisabled(false);
        }
    }

    const changeUsernameSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(checkStatus){
            const formData : any = event.target;
            console.log(formData.username.value);
            /*
            dispatch(
                Actions.submitFormLogin(
                    {
                        username_or_email: formData.username_or_email.value,
                        password: formData.password.value
                    }
                )
            )
            */
        }
    }

    const checkUsernameChangeForm = (formError: any) : void => {
        if(Object.keys(formError).length > 0){
            setUsernameChangeDisabled(true);
        }else{
            setUsernameChangeDisabled(false);
        }
    }

    return(
        <div>
            <Panel style={{marginBottom: 20}} bordered>
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <h5 style={{marginTop: 20}}>Profile Image</h5>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <ProfileImageUploader style={{marginBottom: 20}} />
                            <IconButton disabled={!User.ProfileImage} onClick={DeleteProfileImage} style={{marginBottom:15, width: 150}} appearance="default" color="red" icon={<><i className="fad fa-trash-alt" style={{marginRight: 10, marginLeft: -30}} /></>} >Resmi Sil</IconButton>
                            <p>Dosya formatı: JPEG, PNG (önerilen 300 x 300, maksimum 10 MB </p>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                    <h5 style={{marginTop: 20}}>Background Image</h5>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <BackgroundImageUploader style={{marginBottom: 20}} />
                            <IconButton disabled={!User.BackgroundImage} onClick={DeleteBackgroundImage} style={{marginBottom:15, width: 150}} appearance="default" color="red" icon={<><i className="fad fa-trash-alt" style={{marginRight: 10, marginLeft: -30}} /></>} >Resmi Sil</IconButton>
                            <p>Dosya formatı: JPEG, PNG (önerilen 1200 x 480, maksimum 10 MB </p>
                        </div>
                    </Col>
                </Row>
            </Panel>

            <Panel header={<><h5 style={{marginTop: 20}}>Profile Settings</h5><p>Hesasbın kimlik bilgilerini değiştirin.</p></>} bordered>
                <Grid>
                    <Row style={{maxWidth: 700}}>
                        <Col xs={24} sm={24} md={24}>
                            <Form fluid style={{marginTop: 20}}>
                                <FormGroup>
                                    <ControlLabel>Kullanıcı Adı</ControlLabel>
                                    <InputGroup>
                                        <FormControl placeholder={User.username} disabled type="text" />
                                        <InputGroup.Button onClick={() => setOpenUsernameFormModal(true)}>
                                            <i className="fad fa-pen"/>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs={24} sm={24} md={24}>
                            <Form fluid style={{marginTop: 20}} model={FormModel} formDefaultValue={{displayName: User.displayName, biography: User.biography}} onSubmit={saveChanges} onCheck={checkForm}>
                                <FormGroup style={{width: 300}}>
                                    <ControlLabel>Görünen Ad</ControlLabel>
                                    <FormControl name="displayName" type="text" />
                                </FormGroup>
                                <FormGroup style={{maxWidth: 600}}>
                                    <ControlLabel>Biyografi</ControlLabel>
                                    <FormControl componentClass="textarea" rows={3} name="biography" type="text" />
                                </FormGroup>
                                <Button appearance="primary" type="submit" disabled={saveChangesDisabled}>Değişiklikleri Kaydet</Button>
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </Panel>

            <Modal size="xs" backdrop="static" show={openUsernameFormModal} onHide={() => setOpenUsernameFormModal(false)}>
                <Modal.Header>
                    <Modal.Title>Kullanıcı Adı Değiştirme</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    Kullanıcı adları 60 günde bir güncellenebilir. 
                    Güncelleme anında devreye girer ve arkadaşlarınızla takipçilerinizin, sizi nasıl takip ettiklerini etkiler.
                    {User.username} adı, 6 ay sonra müsait kullanıcı adları havuzuna geri bırakılacaktır.
                    <Form fluid style={{marginTop: 20}} model={usernameChangeModel} onSubmit={changeUsernameSubmit} onCheck={checkUsernameChangeForm}>
                        <FormGroup style={{width: 300}}>
                            <ControlLabel>Kullanıcı Adı</ControlLabel>
                            <FormControl name="username" type="text" />
                        </FormGroup>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button style={{marginRight: 20}} appearance="primary" color="red" type="submit" disabled={saveUsernamChangeDisabled}>Güncelle</Button>
                            <Button onClick={() => setOpenUsernameFormModal(false)} appearance="subtle">İptal</Button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    )
};

export default ProfileSettings;