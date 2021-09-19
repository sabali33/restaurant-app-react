import config from "../config";

export const GET_TABLES = "GET_TABLES";
export const CREATE_TABLE = "CREATE_TABLE";
export const UPDATE_TABLE = "UPDATE_TABLE";
export const DELETE_TABLE = "DELETE_TABLE";

export const getTablesAction = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        console.log(token)
        const response = await fetch(`${config.apiRoot}tables`, {
            headers:{
                Authorization: `Bearer ${token.token}`
            }
        });
        const tables = await response.json();
        if( tables.error ){
            throw new Error(tables.message)
        }
        return dispatch({
            type: GET_TABLES,
            tables
        });
    }
}

export const createTableAction = (id, numberOfSeats ) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const restaurant = getState().auth.user.store;
        const response = await fetch(`${config.apiRoot}table`, {
            method: "POST",
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({
                id,
                numberOfSeats: numberOfSeats,
                restaurantId: restaurant.id
            })
        });
        const table = await response.json();

        if( table.error ){
            throw new Error(table.message);
        }
        return dispatch({
            type: CREATE_TABLE,
            table: table
        })
    }
}
export const updateTableAction = (id, numberOfSeats ) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const restaurant = getState().auth.user.store;
        const response = await fetch(`${config.apiRoot}table/${id}`, {
            method: "PUT",
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({
                id,
                numberOfSeats: numberOfSeats,
                restaurantId: restaurant.id
            })
        });
        const table = await response.json();

        if( table.error ){
            throw new Error(table.message);
        }
        return dispatch({
            type: UPDATE_TABLE,
            table: {
                id,
                number_of_seats: numberOfSeats,
                restaurantId: restaurant.id
            }
        })
    }
}
export const deleteTableAction = id => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${config.apiRoot}table/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
        const deleted = response.json();
        if( deleted.error ){
            throw new Error("Couldn't delete table");
        }
        return dispatch({
            type: DELETE_TABLE,
            id: id
        });

    }
}