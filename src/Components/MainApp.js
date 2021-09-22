import React, { useState } from 'react';
import CreateRestaurantForm from './CreateRestaurantForm';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';

import Dashboard from './Dashboard';
import Tables from './Tables';
import Reservations from './Reservations';

const MainApp = () => {
    
    const user = useSelector( state => state.auth );
    const [ activeComponentName, setActiveComponentName ] = useState('dashboard');
    const [ activeTab, setActiveTab ] = useState('dashboard');
    
    const components = {
        dashboard: Dashboard,
        tables: Tables,
        reservations: Reservations
    }
    const setActiveComponentHandler = (name, event) => {
        
        setActiveComponentName(name);
        setActiveTab(name);
        
    }

    if(!user.user.store ){
        return <CreateRestaurantForm />
    }
    const ActiveComponent = components[activeComponentName];
    
    return <section>
        <div className="flex w-full">
            <div className="w-1/4">
                <Navigation setActiveComponent={setActiveComponentHandler} activeTab={activeTab}/>
            </div>
            <div className="w-3/4 ml-8">
                <ActiveComponent/>
            </div>
        </div>
        
    </section>
}
export default MainApp;