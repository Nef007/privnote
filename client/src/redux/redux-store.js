import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./auth-reducer";
import {linkReducer} from "./link-reducer";




let reducers = combineReducers({
    authState:authReducer,
    linkState:linkReducer,




});

let store = createStore(reducers, compose((applyMiddleware(thunkMiddleware)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

))



export default store;
