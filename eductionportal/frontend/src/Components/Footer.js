import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import '../CSS/Footer.css'

function Footer() {

  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <footer>
      <div className="user">{auth ? auth.firstName : null} .</div>
      <div className="lougout">
        <button onClick={()=>{setAuth(null); navigate('../') }}></button>
      </div>
    </footer>
  )
}

export default Footer