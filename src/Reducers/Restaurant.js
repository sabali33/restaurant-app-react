import { CREATE_RESTAURANT } from '../Actions/Restaurant';
const initialState = {
    restaurant: null
};

export const CreateRestaurantReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case CREATE_RESTAURANT:
            return {
                ...state,
                restaurant: action.restaurant
            }
        
        default:
            return state;
    }
}