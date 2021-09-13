import { useSelector } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup';
import CheckSetup from './Components/CheckSetup'


function App() {
  const user = useSelector( state => state.auth);
  console.log(user)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="/"
          rel="noopener noreferrer"
        >
          Restaurant App
        </a>
        
      </header>
      <main>
        { user.user ? <CheckSetup user={user.user}/> : <LoginSignup />}
      </main>
    </div>
  );
}

export default App;
