import {applyMiddleware, compose, createStore, Reducer} from 'redux';
import createReducer from './reducers/index';
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
//reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

let asyncReducers : any;
const store = createStore(createReducer(asyncReducers), enhancer);

export const injectReducer = (key : string, reducer : Reducer) : any => {
    if ( asyncReducers[key] )
    {
        return;
    }
    asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(asyncReducers));
    return store;
};

export default store;
