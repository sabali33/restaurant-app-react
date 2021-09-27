import React, { useState } from 'react'

const ReservationFilter = props => {
    const [currentTab, setCurrentTab ] = useState('future');
    const setTabHandler = async (tab) => {
        setCurrentTab(tab);
        
         props.onFilterReservations(tab);
    }
    
    const mq = window.matchMedia(`(max-width: 640px)`);
    
    return <div className="">
        <div className="flex flex-wrap sm:flex-nowrap justify-between w-full items-center">
            <span> Filter</span>
            <div className="flex content-around md:w-full lg:ml-8 items-center">
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
            className="lg:w-60 cursor-pointer bg-yellow-200 px-4 py-2 rounded text-gray-800"
            onClick={props.onShowReservationFormHandler}> {mq.matches ? 'Add' : 'Add Reservation'}  </span>
        </div>
    </div>
}

export default ReservationFilter;