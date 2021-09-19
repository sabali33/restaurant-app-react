import config from "../config";

export const GET_TABLES = "GET_TABLES";
export const CREATE_TABLE = "CREATE_TABLE";

export const getTablesAction = () => {
    return async dispatch => {
        const response = await fetch(`${config.apiRoot}tables`);
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
        
        const response = await fetch(`${config.apiRoot}table`, {
            method: "POST",
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                id,
                number_of_seats: numberOfSeats
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