import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import axios from 'axios';
import Header from './components/Header';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';


axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="App">
     <Router>
       <Header/>
       <Switch>
         {loggedIn===false &&(
           <>
         <Route path="/register">
         <Register/>
        </Route>
         <Route path="/login">
         <Login/>
         </Route>
        <Route path="/">
         <div className="empty_div">

         </div>
        </Route>
        </>
         )}
         {loggedIn===true &&(
         
           <>
            <Route path="/profile/:username">
           <Profile/>
           </Route>
           <Route path="/home">
           <HomePage/>
           </Route>
           </>
         )}
       </Switch>
     </Router>
    </div>
  );
}

export default App;
