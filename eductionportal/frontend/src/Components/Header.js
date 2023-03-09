import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa"
import '../CSS/Header.css'
import { Link } from 'react-router-dom';
function Header() {

    const { auth } = useContext(AuthContext);

    console.log("In header : " + JSON.stringify(auth));

    return (
        <header className='main-nav'>

            <div className='logo'>
                <h2>
                    <span>E</span>ducation
                    <span>P</span>ortal
                </h2>
            </div>

            <div className='menu-link'>

                        <Link to={'/'}>Home</Link>

                        <Link to={'/about'}>About</Link>

                        <Link to={'/contact'}>Contact</Link>

            </div>

            {/* <div className='social-media'>
                <ul className='social-media-desktop'>
                    <li><Link href=""><FaFacebookSquare /></Link></li>
                    <li><Link href=""><FaInstagramSquare /></Link></li>
                    <li><Link href=""><FaYoutubeSquare /></Link></li>
                    <li>{auth ? auths.firstName : null}</li>
                </ul>

            </div> */}

        </header>
    )
}

export default Header