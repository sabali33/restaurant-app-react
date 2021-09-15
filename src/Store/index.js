import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from '../Reducers/Auth';
import { CreateRestaurantReducer } from '../Reducers/Restaurant';
const store = createStore(combineReducers({
    auth: AuthReducer,
    restaurant: CreateRestaurantReducer
}), applyMiddleware(thunk));

export default store;