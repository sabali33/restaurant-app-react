import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from '../Reducers/Auth';

const store = createStore(combineReducers({
    auth: AuthReducer
}), applyMiddleware(thunk));

export default store;