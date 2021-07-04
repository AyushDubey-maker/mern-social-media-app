import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Register.css'
import axios from 'axios'
function Register() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const history=useHistory()
    const isInvalid = password === "" || emailAddress === "";

    const handleChange = (e) => {
        setProfilePic(e.target.files[0])
    };
  async function handleRegister(e){
       e.preventDefault()
       try{
           const form_data=new FormData();
           form_data.append("username",username)
           form_data.append("fullname",fullName)
           form_data.append("email",emailAddress)
           form_data.append("profilePic",profilePic)
           form_data.append("password",password)
           form_data.append("confirmpassword",confirmpassword)

           await axios.post("http://localhost:5000/auth/",form_data,
           {withCredentials:true})
           .then(()=>history.push('/home'))
           setEmailAddress("")
           setPassword("")
           setConfirmPassword("")
           setUsername("")
           setFullName("")
           setProfilePic("")
       }catch(err){
           alert(err.message)
       }
    }
    return (
        <div className="register_container">
        <div className="register_image_slider">
   
      </div> 
            <div className="register_form_div">
            <div className="register_form">
            <h1>Register Account</h1>
            <form onSubmit={handleRegister}  encType="multipart/form-data">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
            
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
             
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <input
              aria-label="Enter your confirm password"
              type="password"
              placeholder="Confirm Password"
             
              onChange={({ target }) => setConfirmPassword(target.value)}
              value={confirmpassword}
            />
            <label>Select a profile pic</label>
            <input
             className="file-input"
              required
               filename="profilePic"
              onChange={handleChange}
              type="file"
            />
            <button
              disabled={isInvalid}
              type="submit"
             
            >
              Sign Up
            </button>
          </form>
            <div className="go_to_login">
            <p>
                Have an account?{` `}
                <Link to="/login">
                    Login
                </Link>
            </p>
            </div>
            </div>
        </div>
       </div>
    )
}

export default Register
