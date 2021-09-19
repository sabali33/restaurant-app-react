import React from 'react'

const Navigation = props  => {
   
    return ( <ul className="flex flex-col p-8 rounded bg-gray-300">
        <li 
            className={ props.activeTab === 'dashboard' ? `text-base cursor-pointer py-4 border border-gray-700 pl-4 rounded bg-yellow-200` : "text-gray-800 text-base cursor-pointer py-4 border-b border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'dashboard')}> 
            Dashboard 
        </li>
        <li 
            className={ props.activeTab === 'tables' ? `text-base cursor-pointer py-4 border border-gray-700 pl-4 rounded bg-yellow-200` : "text-gray-800 text-base cursor-pointer py-4 border-b border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'tables')}> Tables </li>
        <li 
            className={ props.activeTab === 'reservations' ? `text-base cursor-pointer py-4 border border-gray-700 pl-4 rounded bg-yellow-200` : "text-gray-800 text-base cursor-pointer py-4 border-b border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'reservations')}> Reservations </li>
    </ul>)
}

export default Navigation;