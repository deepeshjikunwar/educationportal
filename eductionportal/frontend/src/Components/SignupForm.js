import React, { useState, useContext } from 'react';
import TwoSvg from '../images/one.svg'
import '../CSS/Login.css'

import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

function SignupForm() {
  const location = useLocation();
  console.log(location);
  var isAdmin = location.pathname === "/signup_admin" ? true : false;
  const LOGIN_URL = isAdmin ? '/admin/signup' : '/users/signup';

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        { firstName, lastName, email, password }
      );
      console.log("response :" + JSON.stringify(response));
      //console.log(JSON.stringify(response));
      // setAuth(response.data);
      setAuth(null)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      isAdmin ? navigate('../login_admin') : navigate('../login_user');


      // console.log(auth);
    } catch (err) {
      console.log("error in Signup : " + err);
    }



  };

  return (
    <div className="login signup">
      <img className='login-img' src={TwoSvg} alt="admin_img" />
      <form className='login-form signup-form' onSubmit={handleSubmit}>

        <h1 className='login-form-item login-form-heading'>{isAdmin ? "Admin Sign Up" : "User Sign Up"}</h1>
        <div className="login-form-item">
          <label>
            First Name:
          </label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="login-form-item">

        <label>
          Last Name:
        </label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="login-form-item">

        <label>
          Email:
        </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="login-form-item">

        <label>
          Password:
        </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <button  className='login-form-item signup-form-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
