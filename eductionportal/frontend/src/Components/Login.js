import React, { useContext,useState } from 'react'
import '../CSS/Login.css'
import TwoSvg from '../images/one.svg'

import axios from '../context/AuthProvider';
import AuthContext from '../context/AuthProvider';
const LOGIN_URL = '/login';

function Login() {

  const {setAuth} = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("User : "+userName+"\tPasword : "+password);
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ userName, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log("response :"+JSON.stringify(response));
    //console.log(JSON.stringify(response));
    // setAuth({ user, pwd, roles, accessToken });
    } catch(err){
      if (!err) {
        setErrMsg('No Server Response');
      } else if (err === 401) {
        setErrMsg('Unauthorized');
        } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <div className="outer_div">
  <div className="inner_div">
    <img src={TwoSvg} alt="admin_img" height="440px" width="430px" />
  </div>

  <form method="" id="singup_form" onSubmit={handleSubmit}>
    <h1 style={{ marginTop: "20px", textTransform: "uppercase", fontWeight: "bold" }}>Admin Login</h1>
    <div className="inner_form">
      <label htmlFor="email" className="label_form">
        Username or Email
      </label>
      <br />
      <input type="text" name="email" id="email" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter your email" />
      <br />
      <label htmlFor="password" className="label_form">
        Password
      </label>
      <br />
      <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
      <br />
      <input type="submit" value="LogIn" />
      {errMsg}
      <p>
        Don't have account?
        <a href="signup.html">Sign Up</a>
      </p>

    </div>
  </form>
</div>

  )
}

export default Login


