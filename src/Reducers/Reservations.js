const { GET_RESERVATION, CREATE_RESERVATION, GET_RESERVATIONS, DELETE_RESERVATION, UPDATE_RESERVATION } = require("../Actions/Reservations");

const initialState = {
    tableReservations: [],
    reservations: []
}

export const getTableReservationsReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_RESERVATION:
            return {
                ...state,
                tableReservations: action.tableReservations
            }
        case CREATE_RESERVATION:
            return {
                ...state,
                tableReservations: [...state.tableReservations, action.reservation ]
            }
        case GET_RESERVATIONS:
            return {
                ...state,
                reservations: action.reservations
            }
        case DELETE_RESERVATION:
            const newReservations = state.tableReservations.filter( reservation => {
                return reservation.id !== action.reservation_id
            });
            return {
                ...state,
                tableReservations: newReservations
            }
        case UPDATE_RESERVATION:
            const updatedReservations = state.tableReservations.filter( reservation => {
                return reservation.id !== action.reservation.id
            });
            
            return {
                ...state,
                tableReservations: [...updatedReservations, action.reservation ]
            }
        default:
            return state;
    }
}