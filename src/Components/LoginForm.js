import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../Actions/Auth';
import { isEmail } from '../Utils';

const LoginForm = props => {
    const [ loginEmail, setLoginEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');
    const [ loginError, setLoginError ] = useState('');
    const dispatch = useDispatch();

    const loginInputChangeHandler = (setFunc, event) => {
        event.persist();
        setFunc(event.target.value);
    }
    const loginHandler = async () => {
        
        if(loginEmail.trim().length < 1){
            setLoginError("Email field can't be empty");
            return;
        }
        if(loginPassword.trim().length < 1){
            
            setLoginError("Password can't be empty");
            return;
        }
        if( !isEmail(loginEmail) ){
            setLoginError("Email Address is not valid");
            return;
        }
        try{
           await dispatch(loginAction(loginEmail, loginPassword)); 
        }catch( err){

            setLoginError(err.message);
        }
    }
    
    return (
        <div className="login-box sm:order-1 md:order-2 md:w-1/2 p-12 border-2 border-solid border-gray-200 border-opacity-100 rounded-md">
            {
                Object.keys(loginError).length > 0 ? <div className="text-red-400 pt-3 mb-8">{loginError}</div> : ""
            }
            <h2 className="text-2xl font-bold mb-16">
                Login
            </h2>
            <div className="text-field mb-10">
                <p className="mb-2">
                    <label htmlFor="login-email" className="text-gray-700"> Email </label>
                </p>
                <p>
                    <input type="email"  onChange={ loginInputChangeHandler.bind(this, setLoginEmail) } value={loginEmail} id="login-email" className="rounded w-full leading-10 pl-5 shadow bg-gray-400 text-white"/>
                </p>
            </div>
            <div className="text-field mb-10">
                <p className="mb-2">
                    <label htmlFor="login-password" className="text-gray-700"> Password </label>
                </p>
                <p>
                    <input type="password"  onChange={ loginInputChangeHandler.bind(this, setLoginPassword) } value={loginPassword} id="login-password" className="rounded w-full leading-10 pl-5 shadow bg-gray-400"/>
                </p>
            </div>
            <p>
                <button  onClick={ loginHandler } className="rounded px-10 py-3 bg-yellow-200"> Login </button>
            </p>
        </div>

    )
}

export default LoginForm;