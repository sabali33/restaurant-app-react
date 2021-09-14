import config from '../config';

export const LOGIN_USER = "LOGIN_USER";

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
                if( user.message.name === 'TokenExpiredError'){
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
            
            localStorage.setItem('ra-user-token', JSON.stringify({token: user.token, userId: user.user.id}));

            return dispatch({
                ...user,
                type: LOGIN_USER
            });
        }
    }
}