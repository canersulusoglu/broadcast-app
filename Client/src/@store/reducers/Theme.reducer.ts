import * as Actions from '@App/@store/actions';

const initialState = {
    themeModes: {},
    selectedMode: 'light'
};

export type ACTIONTYPE = 
| { type: typeof Actions.LOAD_THEME_MODES; payload: any } 
| { type: typeof Actions.CHANGE_THEME_MODE; payload: any } 
| { type: typeof Actions.SET_DEFAULT_THEME_MODE; payload: any };

const theme = function (state : typeof initialState = initialState, action : ACTIONTYPE) : any {
    switch ( action.type )
    {
        case Actions.LOAD_THEME_MODES:
        {
            return{
                ...initialState,
                themeModes: action.payload
            }
        }
        case Actions.CHANGE_THEME_MODE:
        {
            return {
                ...state,
                selectedMode: action.payload
            };
        }
        case Actions.SET_DEFAULT_THEME_MODE:
        {
            return {
                ...state,
                selectedMode: 'light'
            };
        }
        default:
        {
            return state
        }
    }
};

export default theme;
