import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservationAction, updateReservationsAction } from '../Actions/Reservations';
import { updateTableAction } from '../Actions/Table';
import { sanitizeString } from '../form-fields/sanitizers';
import { Utils } from '../form-fields';

const reservationFormReducer = (state, payload) => {
    switch (payload.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                data: {...state.data, [payload.field] : payload.value}
            }
        case 'FIELD_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [payload.field]: payload.value }
            }
        case 'FIELD_VALID':
            const errors = state.errors;
            delete errors[payload.field];
            return {
                ...state,
                errors: errors
            }
        
        default:
            return state;
    }
}
const ReservationForm = props => {
    const date = props.reservation.date ? props.reservation.date.split('T')[0] : new Date();
    
    const data = Object.keys(props.reservation).length > 0 ? props.reservation : {
        date,
        time: '12:00:00',
        customer_name: '',
        phone: '',
        email: '',
        address: ''
    }
    
    const [reservationState, dispatch ] = useReducer(reservationFormReducer,{
        data: data,
        errors: {}
    });
    const dispatchRedux = useDispatch()
    const hoursOptions = (time) => {
        let options = [];
        for ( let hour = 0; hour < 24; hour++ ){
            options.push(<option key={hour} value={`${hour}:00:00`} defaultValue={time}>{`${hour}:00`}</option>);
        }
        return options;
    }
    const inputChangeHandler =  (field, validators, e) => {
        e.persist();
        if(validators.validators && validators.validators.length > 0){
            validators.validators.forEach( validator => {
                if( !validator(e.target.value)){
                    dispatch({
                        type: 'FIELD_ERROR',
                        field: field,
                        value: 'field not valid'
                    })

                }else{
                    dispatch({
                        type: 'FIELD_VALID',
                        field: field
                    })
                }
            })
        }
        
        if( field === 'time' ){
            if( isDateLate(reservationState.data.date, e.target.value) ){
                dispatch({
                    type: "FIELD_ERROR",
                    value: 'Time is late',
                    field: 'time'
                });
                dispatch({
                    type: "FIELD_ERROR",
                    value: 'Time is late',
                    field: 'date'
                });

            }else{
                dispatch({
                    type: "FIELD_VALID",
                    field: 'time'
                });
                dispatch({
                    type: "FIELD_VALID",
                    field: 'date'
                });
            }
        }
        dispatch({
            type: "INPUT_CHANGE",
            field,
            value: validators.sanitize ? validators.sanitize(e.target.value) : e.target.value
        })

    }
    
    const setDateHandler = async date => {
        if( isDateLate(date, reservationState.data.time) ){
            dispatch({
                type: "FIELD_ERROR",
                value: 'Time is late',
                field: 'date'
            });
            dispatch({
                type: "FIELD_ERROR",
                value: 'Time is late',
                field: 'time'
            });
        }else{
            dispatch({
                type: "FIELD_VALID",
                field: 'date'
            });
            dispatch({
                type: "FIELD_VALID",
                field: 'time'
            });
        }
        await dispatch({
            type: "INPUT_CHANGE",
            field: 'date',
            value: date
        });
        
    }
    const isDateLate  = (date, time) => {
        const dateTime = new Date(date) //`${().toISOString().split('T')[0]}T${reservationState.data.time}`;
        time = time.split(":");
        dateTime.setHours(...time);
        return dateTime < new Date();

    }
    const isDateTimeAvailable = () => {
        const foundReservation = props.reservations.find( reservation => {
            const reservationDate = (new Date(reservation.date)).toISOString().split('T')[0];
            const curReservationDate = (new Date(reservationState.data.date)).toISOString().split('T')[0];
            return reservation.time === reservationState.data.time && reservationDate === curReservationDate;
        });
        return foundReservation === undefined ? true : false;
    }
    const createReservationHandler = async (reservation) => {
        if( Object.keys(reservationState.errors).length > 0){
            return;
        }
        try{
            if( Object.keys(reservation).length < 1 ){
                if(props.table.number_of_seats < 1 ){
                    alert('Table is full' );
                    return;
                }
                if( !isDateTimeAvailable() ){
                    alert( 'Sorry the selected time is not available');
                    return;
                }
                await dispatchRedux(createReservationAction({
                    ...reservationState.data,
                    tableId: props.table.id
                }));
                await dispatchRedux(updateTableAction( props.table.id, (props.table.number_of_seats - 1)));
                
                
            }else{
                await dispatchRedux(updateReservationsAction(reservationState.data.id, {
                    ...reservationState.data,
                    tableId: props.table.id
                }));
            }
            
        }catch ( err) {
            console.log(err)
        }
        props.closeFormModal()
    }
    
    return <div className="absolute inset-0 bg-gray-600 bg-opacity-60 h-full pb-full">
        
        <div className="p-4">
            <span className="bg-red-400 text-white font-bold px-4 py-2 rounded" onClick={props.closeFormModal}> Close </span>
        </div>
        
        <div className="py-20 bg-gray-700 md:w-3/4 mx-auto px-4 md:px-12 rounded">
            <h2 className="mb-10 text-lg text-gray-100 font-bold"> You are reserving for table #{props.table.id}</h2>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="date" className="text-white"> Date </label>
                </p>
                <div  className="flex flex-col md:flex-row content-between">
                    {/* <input type="text"  onChange={ inputChangeHandler.bind(this, 'date') } value={reservationState.data.date} id="date" className="rounded leading-10 pl-5 shadow w-1/3"/> */}
                    <div >
                    <DatePicker 
                    selected={new Date(reservationState.data.date)} 
                    onChange={setDateHandler}
                    className="rounded leading-10 pl-5 w-full"
                    dateFormat="yyyy-MM-dd"
                    />
                    {
                        reservationState.errors.date && <span className="text-red-400">{reservationState.errors.date}</span>
                    }
                    </div>
                    <label htmlFor="time" className="text-white mr-4" > Time  </label>
                    <select onChange={ inputChangeHandler.bind(this, 'time', {sanitize: null, validators: null}) } id="time" className="w-full lg:w-1/3 leading-10 rounded h-10">
                    {
                        hoursOptions(reservationState.data.time)
                    }
                    </select>
                    
                </div>
            </div>
            
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="first-name" className="text-white"> Customer Name</label>
                </p>
                <p>
                    <input type="text"  onChange={ inputChangeHandler.bind(this, 'customer_name', {sanitize: sanitizeString}) } value={reservationState.data.customer_name} id="customer-name" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="phone" className="text-white"> Phone </label>
                </p>
                <p>
                    <input type="phone"  
                    onChange={ inputChangeHandler.bind(this, 'phone', {sanitize: sanitizeString, validators: [Utils.validators.isPhoneNumber]}) } 
                    value={reservationState.data.phone} 
                    id="phone" 
                    className="rounded w-full leading-10 pl-5 shadow"/>
                    <span className="text-red-400">{reservationState.errors.phone}</span>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="email" className="text-white"> Email </label>
                </p>
                <p>
                    <input type="email"  onChange={ inputChangeHandler.bind(this, 'email', {validators: [Utils.validators.isEmail]}) } value={reservationState.data.email} id="email" className="rounded w-full leading-10 pl-5 shadow"/>
                    <span className="text-red-400">{reservationState.errors.email}</span>
                </p>
            </div>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="address" className="text-white"> Address </label>
                </p>
                <p>
                    <input type="Text"  onChange={ inputChangeHandler.bind(this, 'address', { validators: null}) } value={reservationState.data.address} id="address" className="rounded w-full leading-10 pl-5 shadow"/>
                </p>
            </div>
            <div className="text-field mb-4">
                <button 
                className="px-4 py-2 rounded bg-yellow-200 text-gray-800" 
                onClick={createReservationHandler.bind(this, props.reservation)}> { props.reservation ? 'Save Changes' :'Create Reservation'}  </button>
            </div>
        </div>

    </div>
}
export default ReservationForm;