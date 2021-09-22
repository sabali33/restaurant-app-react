import React from 'react';

import '../assets/style.css';

const Navigation = props  => {
   
    return ( <ul className="flex flex-col p-8 rounded bg-gray-300">
        <li 
            className={ props.activeTab === 'dashboard' ? `text-base cursor-pointer py-4 border-b-2 border-gray-700 rounded` : "text-gray-800 text-base cursor-pointer py-4 border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'dashboard')}> 
            <i className="icon-dashboard"></i>
            <span className="pl-4"> Dashboard </span>
        </li>
        <li 
            className={ props.activeTab === 'tables' ? `text-base cursor-pointer py-4 border-b-2 border-gray-700 rounded` : "text-gray-800text-base cursor-pointer py-4 border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'tables')}> 
            <i className="icon-table"></i>
            <span className="pl-4"> Tables </span> 
        </li>
        <li 
            className={ props.activeTab === 'reservations' ? `text-base cursor-pointer py-4 border-b-2 border-gray-700 rounded ` : "text-gray-800 text-base cursor-pointer py-4 border-gray-700" }
            onClick={props.setActiveComponent.bind(this, 'reservations')}> 
            <i className="icon-table"></i>
            <span className="pl-4"> Reservations</span>   
        </li>
    </ul>)
}

export default Navigation;