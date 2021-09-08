import {combineReducers, ReducersMapObject} from 'redux';

import Theme from './Theme.reducer';
import Auth from './Auth.reducer';

const createReducer = (asyncReducers : ReducersMapObject) : any =>
    combineReducers({
        Theme,
        Auth,
        ...asyncReducers
    });

export default createReducer;