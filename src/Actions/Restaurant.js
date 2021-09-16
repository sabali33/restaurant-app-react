import config from "../config";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";

export const CreateRestaurantAction = name => {

    return async (dispatch, getState) => {
        const state = getState();
        const token = state.auth.token;
        const response = await fetch(`${config.apiRoot}restaurant`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name})
        });
        const restaurant = await response.json();
        if( restaurant.error ){
            throw new Error(restaurant.message);
        }
        return dispatch({
            type: CREATE_RESTAURANT,
            restaurant: restaurant
        });
    }
}


