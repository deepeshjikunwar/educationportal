import React, { useState , useContext} from 'react';
// import '../CSS/SignUp.css'

import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function SignupFormUser() {
  const LOGIN_URL = '/users/signup';

  const navigate = useNavigate();

  const  { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here

    try {
      const response = await axios.post(LOGIN_URL,
        { firstName, lastName, email, password}
    );
    console.log("Signup FOrm user - response :"+JSON.stringify(response));
    //console.log(JSON.stringify(response));
    setAuth(response.data);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setAuth(null)
    navigate('../login_user')
    // console.log(auth);
    } catch(err){
      if (!err) {
        setErrMsg('No Server Response');
      } else if (err === 401) {
        setErrMsg('Unauthorized');
        } else {
        // setErrMsg(err);
        console.log(err);
      }
    }



  };

  return (
    <form onSubmit={handleSubmit}>
      <center>
      <h1>User Sign Up</h1>
      </center>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormUser;
