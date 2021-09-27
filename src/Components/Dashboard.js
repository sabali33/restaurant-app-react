import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReservationsAction } from '../Actions/Reservations';
import Spinner from './Spinner';

import DatePicker from 'react-datepicker';
import TableReservationsOverview from './TableReservationsOverview';



const Dashboard = () => {
    const [ loadingReservations, setLoadingReservations ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ loadError, setLoadError ] = useState(false);
    const reservations = useSelector( state => state.reservations.reservations );
    const dispatch = useDispatch();
    const getReservations = useCallback( async () =>{
        setLoadingReservations(true);
        try{
            await dispatch(getReservationsAction({date: selectedDate.toISOString().split('T')[0]}));
        }catch( err ){
            console.log(err.message);
            setLoadError( err.message )
        }
        setLoadingReservations(false);
    }, [dispatch, selectedDate])
    useEffect( () => {
        getReservations()
    },[getReservations]);
    const setDateHandler = (date) => {
        setSelectedDate(date);
    }
   
    const reservationsByTable = reservations.reduce( (acc, cur) => {
        if(acc[cur.table_id] === undefined){
            acc[cur.table_id] = [cur];
            
        }else{
            acc[cur.table_id].push(cur);
        }
        return acc;
    }, {});

    const reservationsOverview = [];
    for ( let tableId in reservationsByTable){
        reservationsOverview.push( <TableReservationsOverview tableId={tableId} reservations={reservationsByTable[tableId]} key={tableId}/>)
    }
    
    return (<div className="relative p-4">
        <h1 className="my-4 font-bold text-xl pl-4 md:pl-0"> Dashboard </h1>
        {
            loadingReservations && <div className="absolute inset-0 bg-gray-600 bg-opacity-80 text-center py-10">
                <div className="p-8 mx-auto w-1/5 z-10">
                    <Spinner customClass='text-yellow-200' />
                </div>
                </div>
        }
        {
            loadError && <div className="text-red-400 p-4">{loadError}</div>
        }
        <div className="pb-8 mb-4">
            <h3 className="pl-4 md:pl-0 text-gray-400">Select a date</h3>
            <div className="px-4 py-4 bg-gray-300 border-r">
                <DatePicker 
                onChange={setDateHandler} 
                dateFormat="yyyy-MM-dd" 
                selected={selectedDate} 
                className="rounded border border-gray-700 pl-4" />
            </div>
        </div>
        {
            reservations.length > 0 &&
        <section className="flex justify-between mb-8">
            <div className="font-bold text-gray-400 w-1/5">Time</div>
            <div className="font-bold text-gray-400 w-1/5">Date</div>
            <div className="font-bold text-gray-400 w-1/5">Customer Name</div>
            <div className="font-bold text-gray-400 w-1/5">Phone</div>
            <div className="font-bold text-gray-400 w-1/5 hidden md:inline-flex">Address</div>
        </section>
        }
        <section>
            {
                reservations.length > 0 ? reservationsOverview : <p className="text-gray-400"> No Reservations for {selectedDate.toDateString()}</p>
            }
        </section>
    </div>)
}

export default Dashboard;