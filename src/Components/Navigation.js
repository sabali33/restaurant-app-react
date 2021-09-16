import React from 'react'

const Navigation = props  => {
    return ( <ul className="flex direction-column p-8 rounded bg-gray-300">
        <li className=" text-gray-800 text-base" onClick={props.setActiveComponent.bind(this, 'dashboard')}> Dashboard </li>
        <li className=" text-gray-800 text-base" onClick={props.setActiveComponent.bind(this, 'tables')}> Tables </li>
        <li className=" text-gray-800 text-base" onClick={props.setActiveComponent.bind(this, 'reservations')}> Reservations </li>
    </ul>)
}

export default Navigation;