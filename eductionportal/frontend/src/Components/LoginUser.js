import React, { useContext,useState } from 'react'
import '../CSS/Login.css'
import TwoSvg from '../images/one.svg'
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
const LOGIN_URL = '/users/login';

function LoginUser() {

  const navigate = useNavigate();

  const  { setAuth } = useContext(AuthContext);
  // setAuth({email:"abhi"});
  const [errMsg, setErrMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("User Email : "+email+"\tPasword : "+password);
    try {
      const response = await axios.post(LOGIN_URL,
        { email, password}
    );
    console.log("response :"+JSON.stringify(response));
    //console.log(JSON.stringify(response));
    setAuth(response.data);

    setEmail('')
    setPassword('')
      navigate('../user_dashboard',{replace:true})

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
  }

  return (
    <div className="outer_div">
  <div className="inner_div">
    <img src={TwoSvg} alt="admin_img" height="440px" width="430px" />
  </div>

  <form method="" id="singup_form" onSubmit={handleSubmit}>
    <h1 style={{ marginTop: "20px", textTransform: "uppercase", fontWeight: "bold" }}>User Login</h1>
    <div className="inner_form">
      <label htmlFor="email" className="label_form">
        Username or Email
      </label>
      <br />
      <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
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
        <Link to={"/signup_user"}>Sign Up</Link>
      </p>

    </div>
  </form>
</div>

  )
}

export default LoginUser


