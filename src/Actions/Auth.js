import config from '../config';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER_STORE = 'SET_USER_STORE';
export const CREATE_USER = "CREATE_USER";
export const GET_RESTAURANT = "GET_RESTAURANT";

export const loginAction = ( email='', password='' ) => {
    const localStorage = window.localStorage;
    const tokenStr = localStorage.getItem('ra-user-token');
    const token = JSON.parse(tokenStr);
    //localStorage.removeItem('ra-user-token');
    return async (dispatch) => {
        if( !email && !password && token ){
            const resp = await fetch( `${config.apiRoot}user/${token.userId}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            });
            const user = await resp.json();
            if( user.error ){
                
                if( user.name === 'TokenExpiredError'){
                    
                    localStorage.removeItem('ra-user-token');
                    throw new Error('Session has expired');
                }
                throw new Error(user.message);
            }
            
            return dispatch({
                user,
                token: token,
                type: LOGIN_USER
            })
        }else{
            const response = await fetch(`${config.apiRoot}login`, {
                method: "POST",
                headers:{
                    'Content-type': "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const user = await response.json()
            
            if( user.error ){
                throw new Error(user.message);
            }
            
            localStorage.setItem('ra-user-token', JSON.stringify({token: user.token, userId: user.user.id }));

            return dispatch({
                ...user,
                type: LOGIN_USER
            });
        }
    }
}
export const logoutAction = () => {
    const localStorage = window.localStorage;
    localStorage.removeItem('ra-user-token');
    return {
        type: LOGOUT_USER
    }
}

export const getUserRestaurantAction = (restaurant) =>{
    return {
        type: GET_RESTAURANT,
        restaurant
    }
}

export const signUpUserAction = ( firstName, lastName, email, password ) => {
    return async dispatch =>{
        const response = await fetch(`${config.apiRoot}user`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
        const user = await response.json();
        if( user.error ){
            throw new Error(user.message);
        }
        const localStorage = window.localStorage;
        localStorage.setItem('ra-user-token', JSON.stringify({token: user.token, userId: user.user.id}));
        return dispatch({
            type: LOGIN_USER,
            ...user
        });
    }
}
export const setUserAction = ( user ) => {
    return {
        type: LOGIN_USER,
        user,
        token: user.token
    }
}

export const setUserRestaurantAction = ( user_id ) => {
    return async dispatch => {
        const response = await fetch(`${config.apiRoot}/restaurant/${user_id}`);
        const restaurant = await response.json();
        if( restaurant.error ){
            throw new Error( restaurant.message );
        }
        return dispatch({
            type: SET_USER_STORE,
            restaurant
        })
    }
}