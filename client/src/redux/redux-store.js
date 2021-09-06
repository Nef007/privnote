import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./auth-reducer";
import {linkReducer} from "./link-reducer";




let reducers = combineReducers({
    authState:authReducer,
    linkState:linkReducer,




});

let store = createStore(reducers, compose((applyMiddleware(thunkMiddleware))
))



export default store;
