import { LOGIN_USER, LOGOUT_USER, GET_RESTAURANT } from "../Actions/Auth";
const Auth = {
    user: {},
    token: null
}
export const AuthReducer = (state=Auth, action ) => {
    switch( action.type ){
        case LOGIN_USER:
            return { ...state, user:action.user, token: action.token };
        case LOGOUT_USER:
            return {
                ...state,
                user:null,
                token: null
            }
        case GET_RESTAURANT:
            return {
                ...state,
                user: { ...state.user, store: action.restaurant }
            }
        default:
            return state;
    }
}