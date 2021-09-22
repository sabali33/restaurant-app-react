import React from 'react'


const ReservationListItem  = props => {
    return <div className="odd:bg-gray-300 py-2 px-4">
        <div className="flex justify-between w-full items-center group">
            <div>{props.customer_name}</div>
            <div>{(new Date(props.date)).toISOString().split('T')[0]}</div>
            <div>{props.time}</div>
            <div>{props.phone}</div>
            <div>{props.address}</div>
            <div className="w-1/5 h-4 flex items-center">
                
                <button 
                className="bg-gray-400 px-2 py hidden group-hover:inline-flex rounded text-white"
                onClick={props.onShowReservationEditForm.bind(this, props)}
                ><i className="icon-edit"></i> Edit </button>
                <button 
                className="ml-4 bg-red-400 px-2 py hidden group-hover:inline-flex rounded text-white"
                onClick={props.onDeleteReservation.bind(this, props.id)}
                > Delete </button>
                
                
            </div>
        </div>
    </div>
}

export default ReservationListItem;