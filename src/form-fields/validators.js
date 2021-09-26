export const isEmail = (emailAddress) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress);
}

export const confirmPassword = ( password, confirmPassword) => {
    return password === confirmPassword;
}
export const isPhoneNumber = (phoneNumber) => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phoneNumber);
}

export const hasValue = (value) => {
    return value.trim() ? true : false;
}
export const validationRunner = (value, validators) => {
    if(!validators && validators.length < 0){
        return true;
    }
    const valid = validators.every( validator => {
        return validator(value );
    })
    return valid;
}
export const arrayElementsHaveValues = fields => {
    if( !fields ){
        return;
    }
    return fields.every( field => {
        return Boolean(field);
    })
}