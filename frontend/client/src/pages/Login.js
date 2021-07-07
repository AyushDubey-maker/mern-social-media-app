import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import './Login.css'
function Login() {
    const [email,setEmailAddress]=useState('');
    const [password,setPassword]=useState('');
    const {getLoggedIn}=useContext(AuthContext)
    const history=useHistory()

    const isInvalid=password===''||email==='';
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const loginData={
                email,password
            };
            await axios.post("http://localhost:5000/auth/login",loginData)
            .then(()=>history.push('/home'))
            await getLoggedIn()
        }catch(err){
            alert(err.message)
        }
    }
    return (
        <div className="login_container">

           <div className="register_form_div">
        <div className="login_form">
        <h1>Login Account</h1>
        <form onSubmit={handleLogin}  encType="multipart/form-data">
    
      
        <input
          aria-label="Enter your email address"
          type="email"
          placeholder="Email"
        
          onChange={({ target }) => setEmailAddress(target.value)}
          value={email}
        />
        <input
          aria-label="Enter your password"
          type="password"
          placeholder="Password"
         
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      
        <button
          disabled={isInvalid}
          type="submit"
         
        >
          Login
        </button>
      </form>
        <div className="go_to_register">
        <p>
            Want to create an account?{` `}
            <Link to="/register">
                Register
            </Link>
        </p>
        </div>
        </div>
    </div>
    </div>
    )
}

export default Login
