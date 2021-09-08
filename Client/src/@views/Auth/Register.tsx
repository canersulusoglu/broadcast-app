import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '@App/@store/actions';

const Register: React.FunctionComponent<{t:any, i18n:any}> = ({t, i18n}) =>{
    const dispatch = useDispatch();

    const submitRegisterForm = (e) =>{
        e.preventDefault();
        const formData = e.target;

        if(formData.username.value.length > 0 &&
            formData.email.value.length > 0 &&
            formData.username.value.length > 0 &&
            formData.password.value.length > 0 &&
            formData.confirm_password.value.length > 0
        ){
            if(formData.password.value == formData.confirm_password.value){
                // Apiye yolluyoruz
                dispatch(
                    Actions.submitFormRegister(
                        {
                            username: formData.username.value,
                            email: formData.email.value,
                            password: formData.password.value
                        }
                    )
                )
                
            }else{
               alert("Şifreler eşleşmiyor.");
            }
        }else{
            alert("Formu eksiksiz bir şekilde doldurmanız gerekmektedir.");
        }
    }

    return(
        <div>
            <form className="RegisterForm" onSubmit={submitRegisterForm}>
                <label>
                    <p className="LabelText">Kullanıcı Adı:</p>
                    <input className="RegisterInput" type="text" name="username" />
                </label>
                <label>
                    <p className="LabelText">E-Mail:</p>
                    <input className="RegisterInput" type="email" name="email" />
                </label>
                <label>
                    <p className="LabelText">Şifre:</p>
                    <input className="RegisterInput" type="password" name="password" />
                </label>
                <label>
                    <p className="LabelText">Şifre Onayı:</p>
                    <input className="RegisterInput" type="password" name="confirm_password" />
                </label>
                <button type="submit"> Submit Register </button>
            </form>
        </div>
    )
};

export default Register;