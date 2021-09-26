import React from 'react'
import { ReactComponent as Path } from './icons/spinner.svg';

const Spinner = props => {
    return (<span>
        <svg className={`animate-spin h-5 w-5 mr-3 fill-current inline-block ${props.customClass}`} viewBox="0 0 32 32">
            <Path/>
        </svg>
    </span>)
}
export default Spinner;