import * as Actions from '@App/@store/actions';
import authRoles from '@App/@configs/authRoles';

const initialState = {
    User: Object || undefined,
    role: authRoles.guest //guest
};

export type ACTIONTYPE = 
| { type: typeof Actions.LOGIN_SUCCESS; payload: any } 
| { type: typeof Actions.LOGIN_ERROR; payload: any }
| { type: typeof Actions.SET_USER_DATA; payload: any }
| { type: typeof Actions.UPDATE_USER_DATA; payload: any }
| { type: typeof Actions.USER_LOGGED_OUT; payload: any };

const AuthReducer = function (state : typeof initialState = initialState, action : ACTIONTYPE) : any {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                ...initialState
            };
        }
        case Actions.SET_USER_DATA:
        {
            let userRole : Array<string> = authRoles.guest;
            switch (action.payload.Rank) {
                case 0:
                    userRole = authRoles.guest;
                    break;
                case 1:
                    userRole = authRoles.user;
                    break;
                case 2:
                    userRole = authRoles.staff;
                    break;
                case 3:
                    userRole = authRoles.admin;
                    break;
                default:
                    break;
            }
            return {
                ...initialState,
                User: action.payload,
                role: userRole
            };
        }
        case Actions.UPDATE_USER_DATA:
        {
            return{
                ...state,
                User: {...state.User, ...action.payload}
            }
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default AuthReducer;