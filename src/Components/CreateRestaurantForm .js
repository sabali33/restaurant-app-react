import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRestaurantAction } from '../Actions.js/Restaurant';
import MainApp from "./MainApp";

const CreateRestaurantForm = () => {
    const [ name, setName ] = useState('');
    const [ error, setError ] = useState(null);
    const restaurant = useSelector( state => state.restaurant.restaurant );
    const user = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        e.persist();
        setName(e.target.value);
    }
    const saveNameHandler = async e => {
        e.persist();
        try{
            await dispatch( CreateRestaurantAction(name) );
        }catch( err ){
            setError(err.message);
        }
        
    }
    if( restaurant ){
        //return <MainApp user={user.user} />
    }
    return <div>
        <h2 className="text-xl font-bold text-gray-800 mb-10"> Create Restaurant </h2>
        <section className="w-3/5">
            {
                error && <div className="text-red-400 p-4"> { error }</div>
            }
            <div className="text-field p-8 mb-10">
                <p className="mb-2">
                    <label htmlFor="name" className="text-gray-700"> Restaurant Name </label>
                </p>
                <p>
                    <input type="text"  onChange={ inputChangeHandler} value={name} id="name" className="rounded w-full leading-10 pl-5 border-2 border-gray-700 border-opacity-100"/>
                </p>
            </div>
            <p className="mt-2">
                <button onClick={saveNameHandler} className="bg-yellow-200 px-10 py-4 rounded text-gray-800"> Create </button>
            </p>
        </section>
    </div>
}
export default CreateRestaurantForm ;