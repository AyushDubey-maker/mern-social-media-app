import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';
import './Header.css'
import axios from 'axios';
function Header() {
    const {loggedIn} =useContext(AuthContext)
    const { getLoggedIn } = useContext(AuthContext);
    const {userData}=useContext(AuthContext)
    const history=useHistory()
    const logout=async()=>{
        await axios.get("http://localhost:5000/auth/logout")
        .then(()=>history.push('/login'));
        getLoggedIn();
    }
    return (
        <header>
            <div className="header_container">
                <div className="header_inner_container">
                    <div className="header_main_title">
                       
                     <h1>
                        MERN SOCIAL MEDIA
                    </h1>
                  
                    </div>
                    <div className="header_contents">
                    {loggedIn===true &&(
                        <>
                        <Link to="/home">
                        <HomeIcon className="header_icon" titleAccess="Home"/>
                        </Link>
  
                        <ExitToAppIcon className="header_icon" onClick={logout} titleAccess="Logout"/>     
                       
                        <div className="header_user_image">
                         <Link to={`/profile/${userData.username}`}>
                         <Avatar title="Profile" className="user_image" src={`/uploads/${userData.profilePic}`}/>
                         </Link>
                        </div>
                        </>
                    )}
                    {loggedIn===false &&(
                        <>
                        <Link to="/login">
                            <button type="button" className="login_button">
                                Log In
                            </button>
                        </Link>
                        <Link to="/register">
                        <button type="button" className="register_button">
                        Register
                        </button>
                        </Link>
                        </>
                    )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
