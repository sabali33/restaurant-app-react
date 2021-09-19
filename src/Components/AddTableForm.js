import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTableAction } from '../Actions/Table';


const randomNumber = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

const AddTableForm = (props) => {
    const [ numberOfSeats, setNumberOfSeats ] = useState(randomNumber(2, 12));
    const [ errors, setErrors ] = useState('');
    const dispatch = useDispatch();
    const setNumberOfSeatsHandle = e => {
        e.persist();
        setNumberOfSeats(Number(e.target.value));
    }
    const createTableHandler = async () => {
        try{
            await dispatch(createTableAction(props.id, numberOfSeats))
        }catch(err){
            setErrors(err.message)
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
            <p className="text-2xl font-bold mb-10 bg-gray-700 text-yellow-200 rounded pl-4">#{props.id}</p>
            <div className="text-field mb-4">
                <p className="mb-2">
                    <label htmlFor="last-name" className="text-white"> Number of Seats </label>
                </p>
                <p>
                    <input type="number"  onChange={ setNumberOfSeatsHandle } value={numberOfSeats} id="number-of-seats" className="rounded w-full leading-10 pl-5 shadow" min="1"/>
                </p>
            </div>
            <p className="">
            <button onClick={createTableHandler} className="bg-yellow-200 font-bold px-5 py-2 rounded"> Create Table </button>
        </p>
        </div>
        
    </div>
}
export default AddTableForm;