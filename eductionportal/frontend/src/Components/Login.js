import React, { useContext, useState } from 'react'
import '../CSS/Login.css'
import TwoSvg from '../images/one.svg'
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify'


function Login() {
  const location = useLocation();
  var isAdmin = location.pathname === "/login_admin" ? true : false;
  
  const LOGIN_URL = isAdmin ? '/admin/login' : '/users/login';

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  // setAuth({email:"abhi"});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(LOGIN_URL,
        { email, password }
      );
      console.log("response :" + JSON.stringify(response));
      setAuth(response.data);
      setEmail('')
      setPassword('')
      isAdmin ? navigate('../admin_dashboard') : navigate('../user_dashboard');

    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast("Server Not Responding Logged In", { position: "top-right", autoClose: 2000 })
        navigate('../')
      }
      else {
        toast("Some Error in Log In", { position: "top-right", autoClose: 2000 })
      }
    }
  }

  return (
    <div className="login">
      <img className='login-img' src={TwoSvg} alt="admin_img" />
      <form className='login-form' onSubmit={handleSubmit}>

        <h1 className='login-form-item login-form-heading'>{isAdmin? 'Admin Login' : 'User Login'}</h1>
        <div className="login-form-item">
          <label>
            Username or Email
          </label>
          <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="login-form-item">

          <label>
            Password
          </label>

          <input required type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <input className='login-form-item' type="submit" value="LogIn" />
        <div className="login-form-item">
          <label>
          Don't have account?
          </label>
    
          <button onClick={() => {
            isAdmin? navigate("/signup_admin") : navigate("/signup_user")
            }}>Sign Up</button>
        </div>
      
      </form>
    </div>

  )
}

export default Login


