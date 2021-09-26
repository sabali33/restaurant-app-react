import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRestaurantAction } from '../Actions/Restaurant';
import { getUserRestaurantAction } from '../Actions/Auth';
import { sanitizeString  } from '../form-fields/sanitizers'

const CreateRestaurantForm = () => {
    const [ name, setName ] = useState('');
    const [ error, setError ] = useState(null);
    const restaurant = useSelector( state => state.restaurant.restaurant );
    const dispatch = useDispatch();

    const inputChangeHandler = (validators, e) => {
        e.persist();
        const value = validators.sanitize(e.target.value)
        setName(value);
    }
    const saveNameHandler = async e => {
        e.persist();
        try{
            await dispatch( CreateRestaurantAction(name) );
        }catch( err ){
            setError(err.message);
        }
    }

    const getUserRestaurant = useCallback(async () => {
		try{
			await dispatch(getUserRestaurantAction(restaurant))
			
		}catch( err ){
		//console.log(err.message)
        setError(err.message)
		}
	}, [dispatch, restaurant]);

    useEffect( () => {
        getUserRestaurant()
    },[getUserRestaurant])
    
    const validateField = {
        sanitize: sanitizeString
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
                    <input type="text"  onChange={ inputChangeHandler.bind(this, validateField)} value={name} id="name" className="rounded w-full leading-10 pl-5 border-2 border-gray-700 border-opacity-100"/>
                </p>
            </div>
            <p className="mt-2">
                <button onClick={saveNameHandler} className="bg-yellow-200 px-10 py-4 rounded text-gray-800"> Create </button>
            </p>
        </section>
    </div>
}
export default CreateRestaurantForm ;