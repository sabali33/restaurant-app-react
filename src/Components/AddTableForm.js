import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTableAction, deleteTableAction, updateTableAction } from '../Actions/Table';


const randomNumber = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

const AddTableForm = (props) => {
    const storedNumberOfSeats = props.table ? props.table.number_of_seats : randomNumber(2, 12);
    const [ numberOfSeats, setNumberOfSeats ] = useState(storedNumberOfSeats);
    const [ errors, setErrors ] = useState('');
    const dispatch = useDispatch();
    const setNumberOfSeatsHandle = e => {
        e.persist();
        setNumberOfSeats(Number(e.target.value));
    }
    const createTableHandler = async (table) => {
        try{
            if(table){
                await dispatch(updateTableAction(table.id, numberOfSeats));
            }else{
                await dispatch(createTableAction(props.id, numberOfSeats));
            }
            
            props.onCloseModal()
        }catch(err){
            console.log(err)
            setErrors(err.message)
        }
    }
    const deleteTableHandler = async table => {
        try{
            await dispatch(deleteTableAction(table.id));
            props.onCloseModal()
        }catch(err){
            console.log(err.message);
        }
    }
    return <div className="p-4 inset-0 absolute bg-gray-300 bg-opacity-60 rounded">
        <div className="cursor-pointer">
            <span className="bg-red-400 rounded text-white font-bold p-2" onClick={props.onCloseModal }> Close </span>
        </div>
        
            {
                errors && <div className="text-red-400 p-4">{errors}</div>
            }
        
        <div className="w-3/5 bg-gray-500 mx-auto p-4 rounded mb-10">
            <p className="text-2xl font-bold mb-10 bg-gray-700 text-yellow-200 rounded pl-4">#{props.id || props.table.id}</p>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="last-name" className="text-white"> Number of Seats </label>
                </p>
                <p>
                    <input type="number"  onChange={ setNumberOfSeatsHandle } value={numberOfSeats} id="number-of-seats" className="rounded w-full leading-10 pl-5 shadow" min="1"/>
                </p>
            </div>
            <p className="">
            <button onClick={createTableHandler.bind(this, props.table)} className="bg-yellow-200 font-bold px-5 py-2 rounded"> 
            { props.table ? 'Save Table' : 'Create Table' }
            </button>
            {
                props.table && 
                <button onClick={deleteTableHandler.bind(this, props.table)} className="bg-red-400 font-bold px-5 py-2 rounded text-white ml-8"> 
                    Delete
                </button>
            }
            
        </p>
        </div>
        
    </div>
}
export default AddTableForm;