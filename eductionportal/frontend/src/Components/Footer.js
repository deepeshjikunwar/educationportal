import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import '../CSS/Footer.css'

function Footer() {

  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <footer>
      <div className="user"> User : {auth ? auth.firstName : "Not Logged In"}</div>
      <div className="lougout">
        &nbsp;&nbsp;
        <button className="logout-btn" onClick={()=>{setAuth(null); navigate('../') }}>Logout</button>
      </div>
    </footer>
  )
}

export default Footer