import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginSignup from './Components/LoginSignup';
import MainApp from './Components/MainApp'
import { loginAction, logoutAction } from './Actions/Auth';

function App() {
	
	const user = useSelector( state => state.auth);
	console.log(user)
	const dispatch = useDispatch();
	const getUser = useCallback(async () => {
		try{
			await dispatch(loginAction())
		}catch( err ){
		console.log(err.message)
		}
	}, [dispatch]);
	
	useEffect( () => {
		getUser();
		
	}, [getUser]);
	
	const logouthandler = e => {
		e.preventDefault();
		e.persist();
		dispatch(logoutAction())
	}
	
  return (
    <div className="App pt-10">
      	<header className="App-header mb-10 mx-auto container text-center">
			<div className="flex justify-items-start">
				<div className="w-1/3 text-left">
					<a
						className="font-extrabold text-4xl"
						href="/"
						rel="noopener noreferrer"
					>
					Restaurant <span className="text-yellow-200 px-2 bg-gray-600 rounded">App</span>
					</a>
				</div>
				<div className="w-2/3 text-right">
					{
					user.token && 
					<span className="text-gray-500 font-bold"> { `${user.user.first_name } ${user.user.last_name}`} 
					<a href="/" className="text-red-400  ml-4" onClick={logouthandler}>Logout</a></span>
					}
				</div>
			</div>
        
      	</header>
		  
		<main className="container mx-auto">
			{ user.token ? <MainApp /> : <LoginSignup />}
		</main>
    </div>
  );
}

export default App;
