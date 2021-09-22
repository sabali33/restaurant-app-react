import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from '../Reducers/Auth';
import { getTableReservationsReducer } from '../Reducers/Reservations';
import { CreateRestaurantReducer } from '../Reducers/Restaurant';
import { getTablesReducer } from '../Reducers/Tables';

const store = createStore(combineReducers({
    auth: AuthReducer,
    restaurant: CreateRestaurantReducer,
    tables: getTablesReducer,
    reservations: getTableReservationsReducer
}), applyMiddleware(thunk));

export default store;