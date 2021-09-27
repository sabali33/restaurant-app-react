import React from 'react'

const TableReservationsOverview = props => {
    const list = props.reservations.map( reservation => {
        return <div className="p-4 odd:bg-gray-400 even:bg-gray-300 flex justify-between" key={reservation.id}>
            <div className="w-1/5">{reservation.time}</div>
            <div className="w-1/5">{reservation.date.split('T')[0]}</div>
            <div className="w-1/5">{reservation.customer_name}</div>
            <div className="w-1/5 text-sm">{reservation.phone}</div>
            <div className="w-1/5 hidden md:inline-flex">{reservation.address}</div>
        </div>
    })
    return <div className="">
        <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400"> Table #{props.tableId}</span>
            <span className="text-base text-gray-400 italic"> {props.reservations.length} reservations </span>
        </div>
        
        <div className="mb-8">
            {
                list
            }
        </div>
    </div>
}
export default TableReservationsOverview;