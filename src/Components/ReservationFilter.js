import React, { useState } from 'react'

const ReservationFilter = props => {
    const [currentTab, setCurrentTab ] = useState('future');
    const setTabHandler = async (tab) => {
        setCurrentTab(tab);
        
         props.onFilterReservations(tab);
    }
    return <div className="">
        <div className="flex content-between w-full items-center">
            <span> Filter</span>
            <div className="flex content-around w-full ml-8 items-center">
                <span 
                className={currentTab === 'all' ? "cursor-pointer px-4 py-2 rounded bg-gray-300" : "cursor-pointer px-4 py-2 rounded"} 
                onClick={setTabHandler.bind(this, 'all')}>All</span>
                <span className={currentTab === 'past' ? "cursor-pointer px-4 py-2 rounded bg-gray-300" : "cursor-pointer px-4 py-2 rounded"} 
                onClick={setTabHandler.bind(this, 'past')}>Past</span>
                <span 
                className={currentTab === 'future' ? "cursor-pointer px-4 py-2 rounded bg-gray-300" : "cursor-pointer px-4 py-2 rounded"} 
                onClick={setTabHandler.bind(this, 'future')}>future</span>
            </div>
            <span 
            className="w-60 cursor-pointer bg-yellow-200 px-4 py-2 rounded text-gray-800"
            onClick={props.onShowReservationFormHandler}> Add Reservation </span>
        </div>
    </div>
}

export default ReservationFilter;