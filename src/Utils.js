export const isEmail = emailAddress => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress);
}
export const parseQueryArgs = options => {
    if( !options || typeof options !== 'object' ){
        return '';
    }
    let query = '';
    for ( let key in options ){
        query += query ? `&${key}=${options[key]}` : `?${key}=${options[key]}`
    }
    return query;
}