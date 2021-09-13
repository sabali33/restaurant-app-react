import config from '../config';

export const LOGIN_USER = "LOGIN_USER";

export const loginAction = ( email, password ) => {
    
    return async dispatch => {
        const user = await fetch(`${config.apiRoot}login`, {
            method: "post",
            body: JSON.stringify({email, password})
        });
            
        return dispatch({
            user: user.user,
            token: user.token,
            type: LOGIN_USER
        });
    }
}