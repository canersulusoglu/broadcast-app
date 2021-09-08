import { Dispatch } from 'redux';
import { AuthService } from '@App/@services';
import * as Actions from '@App/@store/actions';
import history from '@App/history'; 
import { Alert } from 'rsuite';

export const LOGIN_SUCCESS = '[LOGIN] SUCCESS';
export const LOGIN_ERROR = '[LOGIN] ERROR';
export const SET_USER_DATA = '[USER] SET USER DATA';
export const UPDATE_USER_DATA = '[USER] UPDATE USER DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';
export const REMOVE_PROFILE_IMAGE = '[USER] REMOVE PROFILE IMAGE';
export const REMOVE_BACKGROUND_IMAGE = '[USER] REMOVE BACKGROUND IMAGE';

type LoginParameters = {
    username_or_email: string,
    password:string
}
/**
 * Submit Login
 */
export function submitFormLogin({username_or_email, password} : LoginParameters) : any
{
    return async (dispatch : Dispatch) => {
        let isLoginSuccess = false;

        await AuthService.Login(username_or_email, password)
        .then((data : any) => {
            // Set User Data
            Actions.setUserData(data.User);
            isLoginSuccess = true;

            return dispatch({
                type: LOGIN_SUCCESS,
                payload: data.message
            });
        })
        .catch(error => {
            Alert.error(error);
            return dispatch({
                type   : LOGIN_ERROR,
                payload: error
            });
        });
        
        if(isLoginSuccess){
            history.go(0);
        }
    }
}

type RegisterParameters = {
    username: string,
    email: string,
    password:string
}

/**
 * Submit Form Register
 */
export function submitFormRegister({username, email, password} : RegisterParameters) : any
{
    return (dispatch : Dispatch) => {
        AuthService.Register({
            username,
            email,
            password
        })
        .then((data : any) => {
            console.log(data);
        })
        .catch(error => {
            Alert.error(error);
        });
    }
}

/**
 * Logout
*/
export function logout()
{
    return (dispatch : Dispatch) : any => {
        AuthService.LogOut();
        // Set User Data
        dispatch({
            type   : USER_LOGGED_OUT
        })
    }
}

/**
 * Set User Data
 */
 export function setUserData(User : unknown)
 {
     return (dispatch : Dispatch) : any => {
         // Set User Data
         dispatch({
            type   : SET_USER_DATA,
            payload: User
         })
     }
 }

 /**
 * Update User Data
 */
export function updateUserData(data : unknown)
{
    return (dispatch : Dispatch) : any => {
        dispatch({
            type   : UPDATE_USER_DATA,
            payload: data
        })
    }
}

 /**
 * Remove Profile Image
 */
export function removeProfileImage()
{
    return (dispatch : Dispatch) : any => {
        AuthService.removeProfileImage()
        .then((data : any) =>{
            dispatch({
                type   : UPDATE_USER_DATA,
                payload: {ProfileImage: false}
            });
            Alert.success(data.message);
        }).catch(error =>{
            Alert.error(error);
        })  
    }
}

 /**
 * Remove Background Image
 */
export function removeBackgroundImage()
{
    return (dispatch : Dispatch) : any => {
        AuthService.removeBackgroundImage()
        .then((data : any) =>{
            dispatch({
                type   : UPDATE_USER_DATA,
                payload: {BackgroundImage: false}
            });
            Alert.success(data.message);
        }).catch(error =>{
            Alert.error(error);
        })
    }
}

/**
 * Change Theme Mode
 */
 export function changeThemeMode(mode : string)
 {
     return (dispatch : Dispatch) : any => {
         AuthService.changeThemeMode(mode)
         .then((data : any) => {
            Alert.success(data.message);
            return dispatch({
                type: UPDATE_USER_DATA,
                payload: { Preferences: {theme: mode} }
            });
         })
         .catch(error =>{
             Alert.success(error);
         })
     }
 }