import React from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginSignup = (props) => {
    
    return (
        <div className="login-signup-box mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between w-full">
                <SignupForm />
                <LoginForm />
            </div>
        </div>
    )

}

export default LoginSignup;