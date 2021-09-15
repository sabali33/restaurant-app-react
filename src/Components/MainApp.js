import React from 'react';
import CreateRestaurantForm from './CreateRestaurantForm ';
import { useSelector } from 'react-redux';


const MainApp = (  ) => {
    //const user = useSelector( state => state.auth.user);
    const restaurant = useSelector( state => state.restaurant.restaurant );
    console.log(restaurant)
    if(!restaurant){
        return <CreateRestaurantForm />
    }
    return <div>
        Welcome
    </div>
}
export default MainApp;