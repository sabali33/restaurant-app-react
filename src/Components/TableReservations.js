import React, {useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { deleteReservationsAction, getTableReservationsAction } from '../Actions/Reservations';
import ReservationFilter from './ReservationFilter';
import ReservationForm from './ReservationForm';
import ReservationListItem from './ReservationListItem';

const TableReservations = props => {
    const tableReservations = useSelector(state => state.reservations.tableReservations);
    const [ showReservationForm, setShowReservationForm ] = useState(false);
    const [ editingReservation, setEditingReservation ] = useState({});
    const [ error, setError ] = useState('');

    const dispatch = useDispatch();
    const {id} = props.table;
    const getTableReservations = useCallback(
        async () => {
            try{
                await dispatch(getTableReservationsAction({table_id:id, sort: 'future'}));
            }catch( err ){
                console.log(err);
                setError(err.message);
            }
            
        },
        [dispatch, id],
    );
    useEffect( () => {
        getTableReservations()
    }, [getTableReservations]);

    const  deleteReservation = async (reservation_id) => {
        try {
            await dispatch(deleteReservationsAction(reservation_id));
        } catch (err) {
            console.log(err)
        }
    }
    const  showReservationEditForm = (reservation) => {
        setEditingReservation({
            customer_name: reservation.customer_name,
            email: reservation.email,
            address: reservation.address,
            phone: reservation.phone,
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            table_id: reservation.table_id,
        })
        setShowReservationForm(true)
    }
    const ReservationList = () => {
        return tableReservations.map( reservation => {
            return <ReservationListItem 
            key={reservation.id} { ...reservation } 
            onDeleteReservation={deleteReservation}
            onShowReservationEditForm ={showReservationEditForm}
        />
        })
    }
    const showReservationFormHandler = () => {
        setShowReservationForm(true);
        if(!!editingReservation){
            setEditingReservation({})
        }
    }
    const closeFormModal = () => {
        setShowReservationForm(false);
    }
    
    
    return <div className="ml-8 relative">
        {
            error && <div className="text-red-400">{error}</div>
        }
        <header className="mb-8">
            <h1 className="text-2xl font-bold mb-10">
                Reservations for table #{ props.table.id }
            </h1>
            <div className="my-4">
                <span className="px-4 py-2 border border-gray-400 rounded cursor-pointer" onClick={props.onBackHere}> Back to Reservations </span>
            </div>
            <ReservationFilter 
            onFilterReservations={props.onFilterReservations} 
            onShowReservationFormHandler={showReservationFormHandler}/>

        </header>
        <section className="mt-8">
            {
                tableReservations.length > 0 ? ReservationList() : <span className="mx-auto text-gray-500">No Reservations </span>
            }
            {
                showReservationForm && <ReservationForm 
                table={props.table} 
                closeFormModal={closeFormModal} 
                reservation={editingReservation} 
                reservations={tableReservations}
                />
            }
            
        </section>
    </div>
}

export default TableReservations;