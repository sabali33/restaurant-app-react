import { CREATE_TABLE, GET_TABLES } from "../Actions/Table";

const initialState = {
    tables: []
}

export const getTablesReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_TABLES:
            return {
                ...state,
                tables: action.tables
            };
        case CREATE_TABLE:
            const tables = state.tables;
            return {
                ...state,
                tables: [...tables, action.table ]
            }
        default:
            return state;
    }
}