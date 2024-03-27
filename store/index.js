import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer2";
import { messengerReducer } from "./reducers/messengerReducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});

const middleware = [thunkMiddleware];

// const store = createStore(rootReducer, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
