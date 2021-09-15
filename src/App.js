import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoginSignup from './Components/LoginSignup';
import MainApp from './Components/MainApp'
import { loginAction, logoutAction } from './Actions.js/Auth';


function App() {
	const [restaurant, setRestaurant ] = useState(null);

	const user = useSelector( state => state.auth);
	const { store } = user;
	const dispatch = useDispatch();
	const getUser = useCallback(async () => {
		try{
		await dispatch(loginAction())
		}catch( err ){
		console.log(err.message)
		}
	}, [dispatch]);
	const getUserRestaurant = useCallback(async () => {
		try{
			if(store){
				setRestaurant(store);
			}
		
		}catch( err ){
		console.log(err.message)
		}
	}, [store]);

	useEffect( () => {
		getUser();
		getUserRestaurant()

	}, [getUser, getUserRestaurant]);

	const logouthandler = e => {
		e.preventDefault();
		e.persist();
		dispatch(logoutAction())
	}
  return (
    <div className="App pt-10">
      	<header className="App-header mb-10 mx-auto container text-center">
			<div className="flex">
			<div className="w-1/3">
				<a
					className="font-extrabold text-4xl"
					href="/"
					rel="noopener noreferrer"
				>
				Restaurant <span className="text-yellow-200 px-2 bg-gray-600 rounded">App</span>
				</a>
			</div>
			<div className="w-2/3">
				{
				user.user && 
				<span className="text-gray-500 font-bold"> { `${user.user.first_name} ${user.user.last_name}`} 
				<a href="/" className="text-red-400" onClick={logouthandler}>Logout</a></span>
				}
			</div>
			</div>
        
      	</header>
		  
		<main className="w-3/5 mx-auto">
			{ user.user ? <MainApp/> : <LoginSignup />}
		</main>
    </div>
  );
}

export default App;
