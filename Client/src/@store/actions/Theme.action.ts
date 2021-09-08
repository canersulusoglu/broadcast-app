import { AnyAction, Dispatch } from 'redux';

export const LOAD_THEME_MODES = '[THEME] LOAD THEME MODES';
export const CHANGE_THEME_MODE = '[THEME] CHANGE THEME MODE';
export const SET_DEFAULT_THEME_MODE = '[THEME] SET DEFAULT THEME MODE';

export function loadThemeModes(modes : any)
{
    return (dispatch : Dispatch) : AnyAction | any => {
        return dispatch({
            type: LOAD_THEME_MODES,
            payload: modes
        });
    }
}

export function switchThemeMode(mode : string)
{
    return (dispatch : Dispatch) : AnyAction | any => {
        return dispatch({
            type: CHANGE_THEME_MODE,
            payload: mode
        });
    }
}

export function setDefaultThemeMode(){
    return (dispatch : Dispatch) : AnyAction => {

        return dispatch({
            type: SET_DEFAULT_THEME_MODE
        });
    }
}