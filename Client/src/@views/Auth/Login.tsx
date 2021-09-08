import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '@App/@store/actions';
import { Button, Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Schema, Panel, } from 'rsuite';
import history from '@App/history';

const { StringType } = Schema.Types;
const model = Schema.Model({
  username_or_email: StringType().isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.')
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
}

const Login: React.FunctionComponent<{t:any, i18n:any}> = ({t, i18n}) =>{
    const dispatch = useDispatch();

    const submitLoginForm = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(checkStatus){
            const formData : any = event.target;

            dispatch(
                Actions.submitFormLogin(
                    {
                        username_or_email: formData.username_or_email.value,
                        password: formData.password.value
                    }
                )
            )
        }
    }

    return(
        <Panel header={<h3>Login</h3>} bordered>
            <Form fluid model={model} onSubmit={submitLoginForm}>
                <FormGroup>
                    <ControlLabel>Kullanıcı Adı veya E-Mail</ControlLabel>
                    <FormControl name="username_or_email" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Şifre</ControlLabel>
                    <FormControl name="password" type="password" />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit">Sign in</Button>
                        <Button appearance="link">Forgot password?</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        </Panel>
        /*
        <div>
            <Form model={model} onSubmit={submitLoginForm}>
                <TextField type="text" name="username_or_email" label="Kullanıcı Adı veya E-Mail:" />
                <TextField type="password" name="password" label="Şifre:" />
                <ButtonToolbar>
                <Button appearance="primary" type="submit">
                    Submit
                </Button>
                </ButtonToolbar>
            </Form>

            <Button onClick={() =>{ history.push('/') }}> Go To Home Page</Button>
        </div>
        */
    )
};

export default Login;