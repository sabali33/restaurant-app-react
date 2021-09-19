import React, {useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUserAction } from '../Actions/Auth';


const signUpReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                data: {...state.data, [action.field] : action.value }
            };
        case 'FIELD_TOUCH':
            return {
                ...state,
                fieldsDirty: { ...state.fieldsDirty, [action.field]: true}
            }
        case 'ERROR':
            return {
                ...state,
                error: action.message
            }
        default:
            return state;
    }
}

const SignupForm = props => {

    const dispatchRedux = useDispatch();

    const [signupState, dispatch ] = useReducer(signUpReducer, {
        data: {
            'first_name': "",
            'last_name': "",
            'email': "",
            'password': "",
            'password_confirm': "",
        },
        fieldsDirty: {
            'first_name': false,
            'last_name': false,
            'email': false,
            'password': false,
            'password_confirm': false,
        },
        error: ''
    });

    const inputChangeHandler = ( field, e) => {
        e.persist();
        
        dispatch({
            type: 'INPUT_CHANGE',
            field,
            value: e.target.value
        })
    }
    const signupHandler = async event => {
        event.persist();
        try{
            await dispatchRedux(
                signUpUserAction(
                    signupState.data.first_name, 
                    signupState.data.last_name, 
                    signupState.data.email, 
                    signupState.data.password
                )
            )
        }catch( err ){
            console.log(err);
            dispatch({
                type: 'ERROR',
                message: err.message
            })
        }
    }
    
    return (
        <div className="signup-box w-1/2 bg-gray-200 p-12 rounded-md">
            {
                signupState.error && 
                <div className="text-red-400 py-2 px-4">
                    {
                        signupState.error
                    }
                </div>
            }
            <h2 className="text-2xl font-bold mb-16">
                Sign up
            </h2>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="first-name" className="text-gray-700"> First Name </label>
                </p>
                <p>
                    <input type="text"  onChange={ inputChangeHandler.bind(this, 'first_name') } value={signupState.data.first_name} id="first-name" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="last-name" className="text-gray-700"> Last Name </label>
                </p>
                <p>
                    <input type="text"  onChange={ inputChangeHandler.bind(this, 'last_name') } value={signupState.data.last_name} id="last-name" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="email" className="text-gray-700"> Email </label>
                </p>
                <p>
                    <input type="email"  onChange={ inputChangeHandler.bind(this, 'email') } value={signupState.data.email} id="email" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="password" className="text-gray-700"> Password </label>
                </p>
                <p>
                    <input type="password"  onChange={ inputChangeHandler.bind(this, 'password') } value={signupState.data.password} id="password" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="password-confirm" className="text-gray-700"> Password Confirm </label>
                </p>
                <p>
                    <input type="password"  onChange={ inputChangeHandler.bind(this, 'password_confirm') } value={signupState.data.password_confirm} id="password-confirm" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p>
                    <button className="bg-yellow-200 text-gray-600 px-10 py-3 rounded font-bold" onClick={signupHandler}> Sign up</button>
                </p>
            </div>
        </div>
    )
}

export default SignupForm;