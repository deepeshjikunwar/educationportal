import React,{useContext} from 'react'
import AuthContext from '../context/AuthProvider';
import {FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare} from "react-icons/fa"
import '../CSS/Header.css'
import { Link } from 'react-router-dom';
function Header() {

    const {auth} = useContext(AuthContext);

    console.log("In header : "+JSON.stringify(auth));

  return (
    <>
    <nav className='main-nav'>

    <div className='logo'>
    <h2>
        <span>E</span>ducation
        <span>P</span>ortal
    </h2>
    </div>

    <div className='menu-link'>
    <ul>
        <li>
            <Link to={'/'}>Home</Link>
        </li>
        <li>
            <Link to={'/about'}>About</Link>
        </li>
        <li>
            <Link to={'/contact'}>Contact</Link>
        </li>
        <li>
            <Link to={'/service'}> Service</Link>
        </li>
    </ul>

    </div>

    <div className='social-media'>
    <ul className='social-media-desktop'>
        <li><Link href=""><FaFacebookSquare /></Link></li>
        <li><Link href=""><FaInstagramSquare /></Link></li>
        <li><Link href=""><FaYoutubeSquare /></Link></li>
        <li>{auth? auth.firstName : null}</li>
    </ul>

    </div>

    </nav>
</>
  )
}

export default Header