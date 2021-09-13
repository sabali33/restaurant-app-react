import { LOGIN_USER } from "../Actions.js/Auth";
const Auth = {
    user: null,
    token: null
}
export const AuthReducer = (state=Auth, action ) => {
    switch( action.type ){
        case LOGIN_USER:
            return { ...state, user:action.user, token: action.token };

        default:
            return state;
    }
}