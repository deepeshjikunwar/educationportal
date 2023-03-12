import React, { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';
import Footer from './Footer';
import { Button } from 'antd';

function Header() {
  const { auth, setDrawerStatus } = useContext(AuthContext);
  console.log('In header : ' + JSON.stringify(auth));

  return (
    <header className="navbar">
      <nav className="nav-content">
        <div className="logo">
          <h2>
            <span>E</span>ducation
            <span>P</span>ortal
          </h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Footer/>
          </li>
          {/* <li>
            <Button onClick={()=>setDrawerStatus(true)} >Quries</Button>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
