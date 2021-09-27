import React, {useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUserAction } from '../Actions/Auth';
import { Utils } from '../form-fields';
import Spinner from './Spinner';


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
        case 'FIELD_ERROR':
            
            return {
                ...state,
                errors: {...state.errors, [action.field]: action.value}
            }
        case 'FIELD_VALID':
            const errors = state.errors;
            delete errors[action.field];
            return{
                ...state,
                errors: errors
            }
        case "FORM_TOUCHED":
            return {
                ...state,
                formIsTouched: true
            }
        default:
            return state;
    }
}

const SignupForm = props => {
    const [signingUp, setSigningUp ] = useState(false);
    const dispatchRedux = useDispatch();
    const validators = Utils.validators;
    const sanitizeString = Utils.sanitizers.sanitizeString
    const [signupState, dispatch ] = useReducer(signUpReducer, {
        data: {
            'first_name': "",
            'last_name': "",
            'email': "",
            'password': "",
            'password_confirm': "",
        },
        errors: {},
        formIsTouched: false
    });
    const inputChangeHandler = ( field, validators, e) => {
        e.persist();

        const fieldIsValid = validators.validators ? Utils.validators.validationRunner(e.target.value, validators.validators): true;
       
        if(!fieldIsValid){
            dispatch({
                type: 'FIELD_ERROR',
                field: field,
                value: field === 'password_confirm' ? "Password does not match" :`${field} is not valid`
            })
        }else{
            dispatch({
                type: 'FIELD_VALID',
                field: field
            })
        }
         
        dispatch({
            type: 'INPUT_CHANGE',
            field,
            value: validators.sanitize ? validators.sanitize(e.target.value) : e.target.value
        })
        if( !signupState.formIsTouched ){
            dispatch({
                type: 'FORM_TOUCHED'
            })
        }
    }
    const signupHandler = async event => {
        if(Object.keys(signupState.errors).length > 0 || 
        !signupState.formIsTouched || !Utils.validators.arrayElementsHaveValues(Object.values(signupState.data)) ) {
            alert('Enter valid values for all the fields');
            return;
        }
        
        event.persist();
        setSigningUp(true);
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
        setSigningUp(false)
    }
    
    return (
        <div className="signup-box sm:order-2 md:order-1 md:w-1/2 bg-gray-200 p-12 rounded-md">
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
                    <input type="text"  onChange={ inputChangeHandler.bind(this, 'first_name', {sanitize: sanitizeString}) } value={signupState.data.first_name} id="first-name" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="last-name" className="text-gray-700"> Last Name </label>
                </p>
                <p>
                    <input type="text"  onChange={ inputChangeHandler.bind(this, 'last_name', {sanitize: sanitizeString}) } value={signupState.data.last_name} id="last-name" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
                
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="email" className="text-gray-700"> Email </label>
                </p>
                <p>
                    <input type="email"  onChange={ inputChangeHandler.bind(this, 'email', {validators: [validators.isEmail]}) } value={signupState.data.email} id="email" className="rounded w-full leading-10 pl-5 shadow"/>
                    <span className="text-red-400">{signupState.errors.email}</span>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="password" className="text-gray-700"> Password </label>
                </p>
                <p>
                    <input type="password"  onChange={ inputChangeHandler.bind(this, 'password', {validators: []}) } value={signupState.data.password} id="password" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="password-confirm" className="text-gray-700"> Password Confirm </label>
                </p>
                <p>
                    <input 
                    type="password"  
                    onChange={ inputChangeHandler.bind(this, 'password_confirm', {validators: [validators.confirmPassword.bind(this, signupState.data.password)]}) } 
                    value={signupState.data.password_confirm} 
                    id="password-confirm" 
                    className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
                <span className="text-red-400">{signupState.errors.password_confirm}</span>
            </div>
            <div className="text-field mb-4">
                <p>
                    <button className="bg-yellow-200 text-gray-600 px-10 py-3 rounded font-bold" onClick={signupHandler} disabled={signingUp} > 
                    {
                        signingUp ? <Spinner customClass="text-gray-400"/> : 'Sign up'
                    }
                    </button>
                </p>
                
            </div>
            
        </div>
    )
}

export default SignupForm;